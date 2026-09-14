from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class AttendantCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    active: bool = True


class AttendantUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=120)
    email: Optional[EmailStr] = None
    active: Optional[bool] = None


class Attendant(BaseModel):
    id: str
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    active: bool = True
    created_at: str
    updated_at: str
