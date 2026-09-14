import os
from datetime import datetime, timezone

import httpx

from app.cnpj_utils import parse_cnpj
from app.collections import COMPANIES
from app.models.company import Company
from app.store import get_doc, set_doc

_DEFAULT_BASE = "https://brasilapi.com.br"


class BrasilAPIError(Exception):
    def __init__(self, status_code: int, detail: str):
        self.status_code = status_code
        self.detail = detail
        super().__init__(detail)


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _base_url() -> str:
    return os.getenv("BRASILAPI_URL", _DEFAULT_BASE).rstrip("/")


def fetch_cnpj(cnpj: str) -> dict:
    digits = parse_cnpj(cnpj)
    url = f"{_base_url()}/api/cnpj/v1/{digits}"
    try:
        response = httpx.get(url, timeout=10.0)
    except httpx.HTTPError as exc:
        raise BrasilAPIError(502, "BrasilAPI indisponível.") from exc

    if response.status_code == 404:
        raise BrasilAPIError(404, "CNPJ não encontrado na BrasilAPI.")
    if response.status_code >= 400:
        raise BrasilAPIError(502, "Falha ao consultar CNPJ na BrasilAPI.")

    data = response.json()
    return {
        "cnpj": digits,
        "razao_social": data.get("razao_social"),
        "nome_fantasia": data.get("nome_fantasia"),
        "descricao_situacao_cadastral": data.get("descricao_situacao_cadastral"),
        "logradouro": data.get("logradouro"),
        "numero": data.get("numero"),
        "bairro": data.get("bairro"),
        "municipio": data.get("municipio"),
        "uf": data.get("uf"),
        "cep": data.get("cep"),
        "fetched_at": _now(),
    }


def _to_company(doc: dict) -> Company:
    payload = {k: v for k, v in doc.items() if k != "id"}
    payload.setdefault("cnpj", doc.get("id"))
    return Company.model_validate(payload)


def lookup_company(cnpj: str, refresh: bool = False) -> Company:
    digits = parse_cnpj(cnpj)
    if not refresh:
        cached = get_doc(COMPANIES, digits)
        if cached is not None:
            return _to_company(cached)
    data = fetch_cnpj(digits)
    return _to_company(set_doc(COMPANIES, digits, data))
