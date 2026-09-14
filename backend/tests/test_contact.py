CONTACT = {
    "name": "Maria Cliente",
    "email": "maria@empresa.com.br",
    "phone": "13988887777",
    "message": "Gostaria de um orçamento de AVCB para o galpão.",
}


def test_contact_creates_landing_lead(client):
    r = client.post("/api/contact", json=CONTACT)
    assert r.status_code == 201
    assert "id" in r.json()

    leads = client.get("/api/leads", params={"origin": "landing"}).json()
    assert len(leads) == 1
    assert leads[0]["name"] == CONTACT["name"]
    assert leads[0]["origin"] == "landing"
    assert leads[0]["status"] == "novo"
    assert leads[0]["email"] == CONTACT["email"]


def test_contact_validation(client):
    r = client.post("/api/contact", json={"name": "A", "email": "x", "message": "curta"})
    assert r.status_code == 422
