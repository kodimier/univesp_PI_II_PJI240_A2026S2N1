CONTENT = {
    "brand": {
        "name": "PG AVCB Engenharia",
        "shortName": "PG",
        "tagline": "Proteção completa para o seu patrimônio",
        "description": "Consultoria em prevenção contra incêndio.",
    },
    "hero": {
        "eyebrow": "Engenharia de prevenção contra incêndio",
        "title": "Proteção completa para o seu patrimônio.",
        "subtitle": "Atendimento especializado em AVCB e CLCB.",
        "primaryCta": "Falar com especialista",
        "secondaryCta": "Conhecer soluções",
    },
    "about": {"title": "Sobre", "text": "A PG AVCB nasceu para unir rigor técnico."},
    "contact": {"title": "Contato", "description": "Preencha o formulário."},
    "services": [
        {"id": "avcb", "title": "AVCB", "description": "Regularização.", "icon": "shield"}
    ],
}


def test_site_content_not_published_yet(client):
    assert client.get("/api/site-content").status_code == 404


def test_save_and_read_site_content(client):
    saved = client.put("/api/site-content", json=CONTENT)
    assert saved.status_code == 200
    assert saved.json()["updated_at"]

    read = client.get("/api/site-content")
    assert read.status_code == 200
    data = read.json()
    assert data["brand"]["shortName"] == "PG"
    assert data["services"][0]["id"] == "avcb"


def test_save_replaces_services_list(client):
    client.put("/api/site-content", json=CONTENT)
    fewer = {**CONTENT, "services": []}
    client.put("/api/site-content", json=fewer)
    assert client.get("/api/site-content").json()["services"] == []


def test_save_rejects_incomplete_content(client):
    partial = {k: v for k, v in CONTENT.items() if k != "hero"}
    assert client.put("/api/site-content", json=partial).status_code == 422


def test_save_requires_token_but_read_stays_public(client, monkeypatch):
    client.put("/api/site-content", json=CONTENT)
    monkeypatch.setenv("CRM_API_TOKEN", "segredo-pgavcb")
    assert client.put("/api/site-content", json=CONTENT).status_code == 401
    ok = client.put(
        "/api/site-content", json=CONTENT, headers={"X-API-Key": "segredo-pgavcb"}
    )
    assert ok.status_code == 200
    assert client.get("/api/site-content").status_code == 200
