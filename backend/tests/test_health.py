def test_health(client):
    r = client.get("/api/health")
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}


def test_ready(client):
    r = client.get("/api/health/ready")
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "ok"
    assert "firebase" in data
    assert data["crm_auth"] is False
