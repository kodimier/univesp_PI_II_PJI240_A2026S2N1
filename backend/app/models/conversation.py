from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class ConversationStatus(str, Enum):
    aberta = "aberta"
    em_atendimento = "em_atendimento"
    fechada = "fechada"


class MessageDirection(str, Enum):
    inbound = "inbound"
    outbound = "outbound"


class Conversation(BaseModel):
    id: str
    lead_id: Optional[str] = None
    attendant_id: Optional[str] = None
    whatsapp_phone: str = Field(..., min_length=10, max_length=20)
    status: ConversationStatus = ConversationStatus.aberta
    created_at: str
    updated_at: str


class Message(BaseModel):
    id: str
    conversation_id: str
    direction: MessageDirection
    body: str = Field(..., min_length=1, max_length=4096)
    sent_at: str
