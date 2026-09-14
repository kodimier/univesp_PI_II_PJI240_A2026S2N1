from fastapi import APIRouter, HTTPException, Query

from app.brasilapi import BrasilAPIError, lookup_company
from app.cnpj_utils import parse_cnpj
from app.models.company import Company

router = APIRouter(tags=["CRM — CNPJ"])


@router.get("/cnpj/{cnpj}", response_model=Company)
def get_company_by_cnpj(cnpj: str, refresh: bool = Query(False)):
    try:
        parse_cnpj(cnpj)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    try:
        return lookup_company(cnpj, refresh=refresh)
    except BrasilAPIError as exc:
        raise HTTPException(status_code=exc.status_code, detail=exc.detail) from exc
