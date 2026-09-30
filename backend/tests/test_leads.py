LEAD = {
    "name": "Kátia PGAVCB",
    "phone": "13999999999",
    "email": "katia@pgavcb.com.br",
    "cnpj": "12.345.678/0001-95",
    "company_name": "PGAVCB Engenharia",
    "origin": "landing",
    "message": "Pedido de proposta de AVCB",
}


def test_create_lead_returns_novo(client):
    r = client.post("/api/leads", json=LEAD)
    assert r.status_code == 201
    data = r.json()
    assert data["name"] == LEAD["name"]
    assert data["status"] == "novo"
    assert data["origin"] == "landing"
    assert data["cnpj"] == "12345678000195"
    assert "id" in data
    assert "created_at" in data


def test_list_leads_includes_created(client):
    created = client.post("/api/leads", json=LEAD).json()
    r = client.get("/api/leads")
    assert r.status_code == 200
    ids = [item["id"] for item in r.json()]
    assert created["id"] in ids


def test_get_lead_by_id(client):
    created = client.post("/api/leads", json=LEAD).json()
    r = client.get(f"/api/leads/{created['id']}")
    assert r.status_code == 200
    assert r.json()["id"] == created["id"]


def test_get_missing_lead_returns_404(client):
    r = client.get("/api/leads/nao-existe")
    assert r.status_code == 404


def test_update_lead_status(client):
    created = client.post("/api/leads", json=LEAD).json()
    r = client.patch(
        f"/api/leads/{created['id']}/status",
        json={"status": "em_atendimento"},
    )
    assert r.status_code == 200
    assert r.json()["status"] == "em_atendimento"


def test_invalid_status_returns_422(client):
    created = client.post("/api/leads", json=LEAD).json()
    r = client.patch(
        f"/api/leads/{created['id']}/status",
        json={"status": "inventado"},
    )
    assert r.status_code == 422


def test_invalid_cnpj_returns_422(client):
    payload = {**LEAD, "cnpj": "123"}
    r = client.post("/api/leads", json=payload)
    assert r.status_code == 422


def test_filter_leads_by_status_and_origin(client):
    client.post("/api/leads", json=LEAD)
    whatsapp = {**LEAD, "name": "Lead WhatsApp", "origin": "whatsapp", "email": "wa@pgavcb.com.br"}
    created = client.post("/api/leads", json=whatsapp).json()
    client.patch(f"/api/leads/{created['id']}/status", json={"status": "convertido"})

    landing = client.get("/api/leads", params={"origin": "landing"}).json()
    assert all(item["origin"] == "landing" for item in landing)
    assert len(landing) >= 1

    converted = client.get("/api/leads", params={"status": "convertido"}).json()
    assert converted[0]["id"] == created["id"]
