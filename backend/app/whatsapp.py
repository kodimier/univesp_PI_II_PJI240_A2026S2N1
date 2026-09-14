import os
import re
from datetime import datetime, timezone
from typing import Any, Optional

import httpx

from app.brasilapi import BrasilAPIError, lookup_company
from app.cnpj_utils import digits_only
from app.collections import CONVERSATIONS, LEADS, MESSAGES
from app.store import create_doc, find_docs, get_doc, list_docs, update_doc

_CNPJ_RE = re.compile(r"\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2}")
_GRAPH_VERSION = "v21.0"


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def extract_cnpj(text: str) -> Optional[str]:
    compact = digits_only(text)
    if len(compact) == 14:
        return compact
    match = _CNPJ_RE.search(text)
    if match:
        digits = digits_only(match.group())
        if len(digits) == 14:
            return digits
    return None


def parse_incoming(payload: dict[str, Any]) -> list[dict[str, str]]:
    if payload.get("object") != "whatsapp_business_account":
        return []
    parsed: list[dict[str, str]] = []
    for entry in payload.get("entry", []):
        for change in entry.get("changes", []):
            value = change.get("value", {})
            names = {
                contact.get("wa_id"): (contact.get("profile") or {}).get("name")
                for contact in value.get("contacts", [])
            }
            for message in value.get("messages", []):
                if message.get("type") != "text":
                    continue
                body = (message.get("text") or {}).get("body") or ""
                phone = message.get("from") or ""
                if not phone or not body.strip():
                    continue
                parsed.append(
                    {
                        "phone": phone,
                        "body": body.strip(),
                        "name": names.get(phone) or phone,
                        "wamid": message.get("id") or "",
                    }
                )
    return parsed


def _attach_cnpj(lead_id: str, body: str) -> None:
    cnpj = extract_cnpj(body)
    if cnpj is None:
        return
    try:
        company = lookup_company(cnpj)
    except (BrasilAPIError, ValueError):
        return
    update_doc(
        LEADS,
        lead_id,
        {
            "cnpj": cnpj,
            "company_name": company.nome_fantasia or company.razao_social,
        },
    )


def ingest_text_message(
    phone: str, body: str, name: str, wamid: str = ""
) -> dict[str, Any]:
    leads = find_docs(LEADS, "phone", phone)
    if leads:
        lead = leads[0]
    else:
        lead = create_doc(
            LEADS,
            {
                "name": name if len(name) >= 2 else phone,
                "phone": phone,
                "origin": "whatsapp",
                "status": "novo",
                "message": body,
            },
        )

    conversations = find_docs(CONVERSATIONS, "whatsapp_phone", phone)
    if conversations:
        conversation = conversations[0]
        if conversation.get("status") == "fechada":
            conversation = update_doc(
                CONVERSATIONS,
                conversation["id"],
                {"status": "aberta", "lead_id": lead["id"], "attendant_id": None},
            )
    else:
        conversation = create_doc(
            CONVERSATIONS,
            {
                "lead_id": lead["id"],
                "attendant_id": None,
                "whatsapp_phone": phone,
                "status": "aberta",
            },
        )

    message = create_doc(
        MESSAGES,
        {
            "conversation_id": conversation["id"],
            "direction": "inbound",
            "body": body,
            "sent_at": _now(),
            "wamid": wamid or None,
        },
    )
    _attach_cnpj(lead["id"], body)
    update_doc(CONVERSATIONS, conversation["id"], {})
    return {
        "conversation": get_doc(CONVERSATIONS, conversation["id"]),
        "message": message,
        "lead": get_doc(LEADS, lead["id"]),
    }


def list_queue() -> list[dict[str, Any]]:
    open_items = [
        doc
        for doc in list_docs(CONVERSATIONS)
        if doc.get("status") in {"aberta", "em_atendimento"}
    ]
    return sorted(open_items, key=lambda item: item.get("updated_at") or "", reverse=True)


def list_messages(conversation_id: str) -> list[dict[str, Any]]:
    items = find_docs(MESSAGES, "conversation_id", conversation_id)
    return sorted(items, key=lambda item: item.get("sent_at") or "")


def claim_conversation(conversation_id: str, attendant_id: str) -> Optional[dict[str, Any]]:
    conversation = get_doc(CONVERSATIONS, conversation_id)
    if conversation is None:
        return None
    updated = update_doc(
        CONVERSATIONS,
        conversation_id,
        {"status": "em_atendimento", "attendant_id": attendant_id},
    )
    lead_id = (updated or {}).get("lead_id")
    if lead_id:
        update_doc(LEADS, lead_id, {"status": "em_atendimento", "attendant_id": attendant_id})
    return updated


def close_conversation(conversation_id: str) -> Optional[dict[str, Any]]:
    conversation = get_doc(CONVERSATIONS, conversation_id)
    if conversation is None:
        return None
    return update_doc(
        CONVERSATIONS,
        conversation_id,
        {"status": "fechada"},
    )


def send_whatsapp_text(phone: str, body: str) -> Optional[dict[str, Any]]:
    token = os.getenv("WHATSAPP_ACCESS_TOKEN")
    phone_id = os.getenv("WHATSAPP_PHONE_NUMBER_ID")
    if not token or not phone_id:
        return None
    url = f"https://graph.facebook.com/{_GRAPH_VERSION}/{phone_id}/messages"
    try:
        response = httpx.post(
            url,
            headers={"Authorization": f"Bearer {token}"},
            json={
                "messaging_product": "whatsapp",
                "to": phone,
                "type": "text",
                "text": {"body": body},
            },
            timeout=10.0,
        )
        response.raise_for_status()
    except httpx.HTTPError as exc:
        raise RuntimeError("Falha ao enviar mensagem no WhatsApp.") from exc
    return response.json()


def reply_conversation(conversation_id: str, body: str) -> Optional[dict[str, Any]]:
    conversation = get_doc(CONVERSATIONS, conversation_id)
    if conversation is None:
        return None
    send_whatsapp_text(conversation["whatsapp_phone"], body)
    message = create_doc(
        MESSAGES,
        {
            "conversation_id": conversation_id,
            "direction": "outbound",
            "body": body,
            "sent_at": _now(),
        },
    )
    update_doc(
        CONVERSATIONS,
        conversation_id,
        {"status": conversation.get("status") or "em_atendimento"},
    )
    return message
