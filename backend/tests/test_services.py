def test_list_services_returns_defaults(client):
    r = client.get("/api/services")
    assert r.status_code == 200
    data = r.json()
    assert len(data) >= 1
    ids = [s["id"] for s in data]
    assert "avcb" in ids
    assert "clcb" in ids


def test_service_has_required_fields(client):
    r = client.get("/api/services")
    for service in r.json():
        assert "id" in service
        assert "title" in service
        assert "description" in service
