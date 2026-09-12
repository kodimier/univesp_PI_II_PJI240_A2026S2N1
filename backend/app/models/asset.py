from pydantic import BaseModel


class Asset(BaseModel):
    id: str
    name: str
    url: str
    mime_type: str
    category: str
