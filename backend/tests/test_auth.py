def test_crm_routes_open_without_token(client):
    assert client.get("/api/leads").status_code == 200
    assert client.get("/api/attendants").status_code == 200


def test_crm_routes_require_token_when_configured(client, monkeypatch):
    monkeypatch.setenv("CRM_API_TOKEN", "segredo-pgavcb")
    assert client.get("/api/leads").status_code == 401
    ok = client.get("/api/leads", headers={"X-API-Key": "segredo-pgavcb"})
    assert ok.status_code == 200
    bearer = client.get(
        "/api/leads",
        headers={"Authorization": "Bearer segredo-pgavcb"},
    )
    assert bearer.status_code == 200


def test_webhook_stays_public_when_crm_is_locked(client, monkeypatch):
    monkeypatch.setenv("CRM_API_TOKEN", "segredo-pgavcb")
    payload = {"object": "whatsapp_business_account", "entry": []}
    assert client.post("/api/whatsapp/webhook", json=payload).status_code == 200
    assert client.get("/api/whatsapp/conversations").status_code == 401


def test_landing_stays_public_when_crm_is_locked(client, monkeypatch):
    monkeypatch.setenv("CRM_API_TOKEN", "segredo-pgavcb")
    assert client.get("/api/services").status_code == 200
    assert client.get("/api/health").status_code == 200
