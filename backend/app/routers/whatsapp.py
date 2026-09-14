import os
from typing import List

from fastapi import APIRouter, HTTPException, Query, Request
from fastapi.responses import PlainTextResponse

from app.models.whatsapp import (
    ClaimConversation,
    ConversationOut,
    MessageOut,
    OutboundMessage,
)
from app.store import get_doc
from app.collections import CONVERSATIONS
from app.whatsapp import (
    claim_conversation,
    close_conversation,
    ingest_text_message,
    list_messages,
    list_queue,
    parse_incoming,
    reply_conversation,
)

router = APIRouter(tags=["CRM — WhatsApp"])


@router.get("/whatsapp/webhook")
def verify_webhook(
    hub_mode: str | None = Query(None, alias="hub.mode"),
    hub_verify_token: str | None = Query(None, alias="hub.verify_token"),
    hub_challenge: str | None = Query(None, alias="hub.challenge"),
):
    expected = os.getenv("WHATSAPP_VERIFY_TOKEN", "")
    if (
        hub_mode == "subscribe"
        and expected
        and hub_verify_token == expected
        and hub_challenge is not None
    ):
        return PlainTextResponse(hub_challenge)
    raise HTTPException(status_code=403, detail="Token de verificação inválido.")


@router.post("/whatsapp/webhook")
async def receive_webhook(request: Request):
    payload = await request.json()
    processed = 0
    for item in parse_incoming(payload):
        ingest_text_message(item["phone"], item["body"], item["name"], item["wamid"])
        processed += 1
    return {"status": "ok", "processed": processed}


@router.get("/whatsapp/conversations", response_model=List[ConversationOut])
def get_queue():
    return [ConversationOut.model_validate(doc) for doc in list_queue()]


@router.get(
    "/whatsapp/conversations/{conversation_id}",
    response_model=ConversationOut,
)
def get_conversation(conversation_id: str):
    doc = get_doc(CONVERSATIONS, conversation_id)
    if doc is None:
        raise HTTPException(status_code=404, detail="Conversa não encontrada.")
    return ConversationOut.model_validate(doc)


@router.get(
    "/whatsapp/conversations/{conversation_id}/messages",
    response_model=List[MessageOut],
)
def get_conversation_messages(conversation_id: str):
    if get_doc(CONVERSATIONS, conversation_id) is None:
        raise HTTPException(status_code=404, detail="Conversa não encontrada.")
    return [MessageOut.model_validate(doc) for doc in list_messages(conversation_id)]


@router.patch(
    "/whatsapp/conversations/{conversation_id}/claim",
    response_model=ConversationOut,
)
def claim(conversation_id: str, payload: ClaimConversation):
    doc = claim_conversation(conversation_id, payload.attendant_id)
    if doc is None:
        raise HTTPException(status_code=404, detail="Conversa não encontrada.")
    return ConversationOut.model_validate(doc)


@router.patch(
    "/whatsapp/conversations/{conversation_id}/close",
    response_model=ConversationOut,
)
def close(conversation_id: str):
    doc = close_conversation(conversation_id)
    if doc is None:
        raise HTTPException(status_code=404, detail="Conversa não encontrada.")
    return ConversationOut.model_validate(doc)


@router.post(
    "/whatsapp/conversations/{conversation_id}/messages",
    response_model=MessageOut,
    status_code=201,
)
def reply(conversation_id: str, payload: OutboundMessage):
    try:
        doc = reply_conversation(conversation_id, payload.body)
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    if doc is None:
        raise HTTPException(status_code=404, detail="Conversa não encontrada.")
    return MessageOut.model_validate(doc)
