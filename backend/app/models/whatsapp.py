from typing import Optional

from pydantic import BaseModel, Field


class OutboundMessage(BaseModel):
    body: str = Field(..., min_length=1, max_length=4096)


class ClaimConversation(BaseModel):
    attendant_id: str = Field(..., min_length=1, max_length=80)


class ConversationOut(BaseModel):
    id: str
    lead_id: Optional[str] = None
    attendant_id: Optional[str] = None
    whatsapp_phone: str
    status: str
    created_at: str
    updated_at: str


class MessageOut(BaseModel):
    id: str
    conversation_id: str
    direction: str
    body: str
    sent_at: str
    wamid: Optional[str] = None
