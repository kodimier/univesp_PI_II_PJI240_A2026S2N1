from pydantic import BaseModel
from typing import Optional


class Service(BaseModel):
    id: str
    title: str
    description: str
    icon: Optional[str] = None
