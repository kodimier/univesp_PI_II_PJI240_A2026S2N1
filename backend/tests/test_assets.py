def test_list_assets_returns_items(client):
    r = client.get("/api/assets")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) > 0


def test_asset_has_required_fields(client):
    r = client.get("/api/assets")
    for asset in r.json():
        assert "id" in asset
        assert "name" in asset
        assert "url" in asset
        assert "mime_type" in asset
        assert "category" in asset


def test_asset_url_points_to_static(client):
    r = client.get("/api/assets")
    for asset in r.json():
        assert "/static/" in asset["url"]


def test_static_file_is_served(client):
    r = client.get("/api/assets")
    assets = r.json()
    assert len(assets) > 0
    first_url = assets[0]["url"]
    # URL is absolute (http://testclient/static/...) — strip host for TestClient
    path = "/" + first_url.split("/", 3)[-1]
    r2 = client.get(path)
    assert r2.status_code == 200
