from typing import List

from fastapi import APIRouter, Depends, HTTPException

from app.auth import require_crm_token
from app.collections import ATTENDANTS
from app.models.attendant import Attendant, AttendantCreate, AttendantUpdate
from app.store import create_doc, get_doc, list_docs, update_doc

router = APIRouter(
    tags=["CRM — Atendentes"],
    dependencies=[Depends(require_crm_token)],
)


def _to_attendant(doc: dict) -> Attendant:
    return Attendant.model_validate(doc)


@router.get("/attendants", response_model=List[Attendant])
def list_attendants():
    return [_to_attendant(doc) for doc in list_docs(ATTENDANTS)]


@router.post("/attendants", response_model=Attendant, status_code=201)
def create_attendant(payload: AttendantCreate):
    return _to_attendant(create_doc(ATTENDANTS, payload.model_dump(mode="json")))


@router.get("/attendants/{attendant_id}", response_model=Attendant)
def get_attendant(attendant_id: str):
    doc = get_doc(ATTENDANTS, attendant_id)
    if doc is None:
        raise HTTPException(status_code=404, detail="Atendente não encontrado.")
    return _to_attendant(doc)


@router.patch("/attendants/{attendant_id}", response_model=Attendant)
def update_attendant(attendant_id: str, payload: AttendantUpdate):
    doc = update_doc(
        ATTENDANTS, attendant_id, payload.model_dump(exclude_unset=True, mode="json")
    )
    if doc is None:
        raise HTTPException(status_code=404, detail="Atendente não encontrado.")
    return _to_attendant(doc)
