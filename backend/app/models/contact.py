from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class ContactForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    message: str = Field(..., min_length=10, max_length=2000)


class ContactResponse(BaseModel):
    id: str
    message: str
