from unittest.mock import Mock, patch

BRASILAPI_PAYLOAD = {
    "cnpj": "19131243000197",
    "razao_social": "PGAVCB ENGENHARIA LTDA",
    "nome_fantasia": "PGAVCB",
    "descricao_situacao_cadastral": "ATIVA",
    "logradouro": "RUA TESTE",
    "numero": "100",
    "bairro": "CENTRO",
    "municipio": "PERUIBE",
    "uf": "SP",
    "cep": "11750000",
}


def _ok_response(payload=None):
    response = Mock()
    response.status_code = 200
    response.json.return_value = payload or BRASILAPI_PAYLOAD
    return response


@patch("app.brasilapi.httpx.get")
def test_cnpj_lookup_returns_company(mock_get, client):
    mock_get.return_value = _ok_response()
    r = client.get("/api/cnpj/19131243000197")
    assert r.status_code == 200
    data = r.json()
    assert data["cnpj"] == "19131243000197"
    assert data["razao_social"] == "PGAVCB ENGENHARIA LTDA"
    assert data["uf"] == "SP"


@patch("app.brasilapi.httpx.get")
def test_cnpj_is_cached_on_second_call(mock_get, client):
    mock_get.return_value = _ok_response()
    first = client.get("/api/cnpj/19131243000197")
    second = client.get("/api/cnpj/19131243000197")
    assert first.status_code == 200
    assert second.status_code == 200
    assert mock_get.call_count == 1


@patch("app.brasilapi.httpx.get")
def test_cnpj_not_found(mock_get, client):
    response = Mock()
    response.status_code = 404
    mock_get.return_value = response
    r = client.get("/api/cnpj/00000000000000")
    assert r.status_code == 404


def test_cnpj_invalid_returns_422(client):
    r = client.get("/api/cnpj/123")
    assert r.status_code == 422
