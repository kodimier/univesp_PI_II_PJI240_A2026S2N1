ATTENDANT = {
    "name": "Victor Hugo",
    "email": "kodimier@gmail.com",
    "active": True,
}


def test_create_and_list_attendants(client):
    created = client.post("/api/attendants", json=ATTENDANT)
    assert created.status_code == 201
    data = created.json()
    assert data["email"] == ATTENDANT["email"]
    assert data["active"] is True

    listed = client.get("/api/attendants")
    assert listed.status_code == 200
    assert any(item["id"] == data["id"] for item in listed.json())


def test_update_attendant(client):
    created = client.post("/api/attendants", json=ATTENDANT).json()
    r = client.patch(
        f"/api/attendants/{created['id']}",
        json={"active": False},
    )
    assert r.status_code == 200
    assert r.json()["active"] is False


def test_delete_attendant(client):
    created = client.post("/api/attendants", json=ATTENDANT).json()
    r = client.delete(f"/api/attendants/{created['id']}")
    assert r.status_code == 204

    listed = client.get("/api/attendants")
    assert all(item["id"] != created["id"] for item in listed.json())


def test_missing_attendant_returns_404(client):
    r = client.get("/api/attendants/nao-existe")
    assert r.status_code == 404
