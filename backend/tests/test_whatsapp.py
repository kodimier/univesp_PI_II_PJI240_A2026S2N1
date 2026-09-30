from unittest.mock import patch

from app.models.company import Company

INBOUND = {
    "object": "whatsapp_business_account",
    "entry": [
        {
            "changes": [
                {
                    "value": {
                        "contacts": [
                            {
                                "profile": {"name": "Cliente PGAVCB"},
                                "wa_id": "5513999887766",
                            }
                        ],
                        "messages": [
                            {
                                "from": "5513999887766",
                                "id": "wamid.abc",
                                "type": "text",
                                "text": {"body": "Quero um orçamento de AVCB"},
                            }
                        ],
                    }
                }
            ]
        }
    ],
}


def test_webhook_verify_ok(client):
    r = client.get(
        "/api/whatsapp/webhook",
        params={
            "hub.mode": "subscribe",
            "hub.verify_token": "test-verify",
            "hub.challenge": "desafio-123",
        },
    )
    assert r.status_code == 200
    assert r.text == "desafio-123"


def test_webhook_verify_rejects_wrong_token(client):
    r = client.get(
        "/api/whatsapp/webhook",
        params={
            "hub.mode": "subscribe",
            "hub.verify_token": "errado",
            "hub.challenge": "desafio-123",
        },
    )
    assert r.status_code == 403


def test_inbound_message_opens_queue_and_lead(client):
    r = client.post("/api/whatsapp/webhook", json=INBOUND)
    assert r.status_code == 200
    assert r.json()["processed"] == 1

    queue = client.get("/api/whatsapp/conversations").json()
    assert len(queue) == 1
    assert queue[0]["whatsapp_phone"] == "5513999887766"
    assert queue[0]["status"] == "aberta"

    leads = client.get("/api/leads").json()
    assert len(leads) == 1
    assert leads[0]["origin"] == "whatsapp"
    assert leads[0]["status"] == "novo"

    messages = client.get(
        f"/api/whatsapp/conversations/{queue[0]['id']}/messages"
    ).json()
    assert messages[0]["direction"] == "inbound"
    assert "AVCB" in messages[0]["body"]


def test_claim_and_reply_without_meta_token(client):
    client.post("/api/whatsapp/webhook", json=INBOUND)
    conversation_id = client.get("/api/whatsapp/conversations").json()[0]["id"]

    claimed = client.patch(
        f"/api/whatsapp/conversations/{conversation_id}/claim",
        json={"attendant_id": "victor"},
    )
    assert claimed.status_code == 200
    assert claimed.json()["status"] == "em_atendimento"
    assert claimed.json()["attendant_id"] == "victor"

    reply = client.post(
        f"/api/whatsapp/conversations/{conversation_id}/messages",
        json={"body": "Olá! Já vamos atender."},
    )
    assert reply.status_code == 201
    assert reply.json()["direction"] == "outbound"

    closed = client.patch(f"/api/whatsapp/conversations/{conversation_id}/close")
    assert closed.status_code == 200
    assert closed.json()["status"] == "fechada"
    assert client.get("/api/whatsapp/conversations").json() == []


@patch("app.whatsapp.lookup_company")
def test_inbound_cnpj_fills_lead(mock_lookup, client):
    mock_lookup.return_value = Company(
        cnpj="19131243000197",
        razao_social="PGAVCB ENGENHARIA LTDA",
        nome_fantasia="PGAVCB",
        fetched_at="2026-09-14T00:00:00+00:00",
    )
    payload = {
        "object": "whatsapp_business_account",
        "entry": [
            {
                "changes": [
                    {
                        "value": {
                            "contacts": [
                                {
                                    "profile": {"name": "Empresa Cliente"},
                                    "wa_id": "5513999000000",
                                }
                            ],
                            "messages": [
                                {
                                    "from": "5513999000000",
                                    "id": "wamid.cnpj",
                                    "type": "text",
                                    "text": {"body": "19.131.243/0001-97"},
                                }
                            ],
                        }
                    }
                ]
            }
        ],
    }
    client.post("/api/whatsapp/webhook", json=payload)
    lead = client.get("/api/leads").json()[0]
    assert lead["cnpj"] == "19131243000197"
    assert lead["company_name"] == "PGAVCB"


@patch("app.whatsapp.httpx.post")
def test_reply_fails_when_graph_api_errors(mock_post, client, monkeypatch):
    import httpx

    monkeypatch.setenv("WHATSAPP_ACCESS_TOKEN", "token")
    monkeypatch.setenv("WHATSAPP_PHONE_NUMBER_ID", "123")
    mock_post.side_effect = httpx.RequestError("boom")
    client.post("/api/whatsapp/webhook", json=INBOUND)
    conversation_id = client.get("/api/whatsapp/conversations").json()[0]["id"]
    r = client.post(
        f"/api/whatsapp/conversations/{conversation_id}/messages",
        json={"body": "falha"},
    )
    assert r.status_code == 502
