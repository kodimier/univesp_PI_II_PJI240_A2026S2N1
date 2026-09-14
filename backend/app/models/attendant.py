from pydantic import BaseModel, EmailStr, Field


class Attendant(BaseModel):
    id: str
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    active: bool = True
    created_at: str
    updated_at: str
