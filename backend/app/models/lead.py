from enum import Enum
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, field_validator


class LeadOrigin(str, Enum):
    landing = "landing"
    whatsapp = "whatsapp"
    manual = "manual"


class LeadStatus(str, Enum):
    novo = "novo"
    em_atendimento = "em_atendimento"
    aguardando_cliente = "aguardando_cliente"
    convertido = "convertido"
    perdido = "perdido"


class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    phone: Optional[str] = Field(None, max_length=20)
    email: Optional[EmailStr] = None
    cnpj: Optional[str] = None
    company_name: Optional[str] = Field(None, max_length=200)
    origin: LeadOrigin = LeadOrigin.manual
    message: Optional[str] = Field(None, max_length=2000)
    attendant_id: Optional[str] = None

    @field_validator("cnpj")
    @classmethod
    def normalize_cnpj(cls, value: Optional[str]) -> Optional[str]:
        if value is None or value.strip() == "":
            return None
        digits = "".join(ch for ch in value if ch.isdigit())
        if len(digits) != 14:
            raise ValueError("CNPJ deve ter 14 dígitos")
        return digits


class LeadUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=120)
    phone: Optional[str] = Field(None, max_length=20)
    email: Optional[EmailStr] = None
    cnpj: Optional[str] = None
    company_name: Optional[str] = Field(None, max_length=200)
    origin: Optional[LeadOrigin] = None
    message: Optional[str] = Field(None, max_length=2000)
    status: Optional[LeadStatus] = None
    attendant_id: Optional[str] = None

    @field_validator("cnpj")
    @classmethod
    def normalize_cnpj(cls, value: Optional[str]) -> Optional[str]:
        if value is None or value.strip() == "":
            return None
        digits = "".join(ch for ch in value if ch.isdigit())
        if len(digits) != 14:
            raise ValueError("CNPJ deve ter 14 dígitos")
        return digits


class LeadStatusUpdate(BaseModel):
    status: LeadStatus


class Lead(BaseModel):
    id: str
    name: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    cnpj: Optional[str] = None
    company_name: Optional[str] = None
    origin: LeadOrigin
    message: Optional[str] = None
    status: LeadStatus
    attendant_id: Optional[str] = None
    created_at: str
    updated_at: str
