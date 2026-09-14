from typing import List

from fastapi import APIRouter, HTTPException

from app.collections import LEADS
from app.models.lead import Lead, LeadCreate, LeadStatusUpdate, LeadUpdate
from app.store import create_doc, get_doc, list_docs, update_doc

router = APIRouter(tags=["CRM — Leads"])


def _to_lead(doc: dict) -> Lead:
    return Lead.model_validate(doc)


@router.get("/leads", response_model=List[Lead])
def list_leads():
    return [_to_lead(doc) for doc in list_docs(LEADS)]


@router.get("/leads/{lead_id}", response_model=Lead)
def get_lead(lead_id: str):
    doc = get_doc(LEADS, lead_id)
    if doc is None:
        raise HTTPException(status_code=404, detail="Lead não encontrado.")
    return _to_lead(doc)


@router.post("/leads", response_model=Lead, status_code=201)
def create_lead(payload: LeadCreate):
    body = payload.model_dump(mode="json")
    body["status"] = "novo"
    return _to_lead(create_doc(LEADS, body))


@router.patch("/leads/{lead_id}", response_model=Lead)
def update_lead(lead_id: str, payload: LeadUpdate):
    doc = update_doc(LEADS, lead_id, payload.model_dump(exclude_unset=True, mode="json"))
    if doc is None:
        raise HTTPException(status_code=404, detail="Lead não encontrado.")
    return _to_lead(doc)


@router.patch("/leads/{lead_id}/status", response_model=Lead)
def update_lead_status(lead_id: str, payload: LeadStatusUpdate):
    doc = update_doc(LEADS, lead_id, {"status": payload.status.value})
    if doc is None:
        raise HTTPException(status_code=404, detail="Lead não encontrado.")
    return _to_lead(doc)
