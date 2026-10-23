from typing import List, Optional

from pydantic import BaseModel, Field

# Campos em camelCase para casar com o tipo SiteContent do frontend.


class Brand(BaseModel):
    name: str = Field(..., max_length=120)
    shortName: str = Field(..., max_length=20)
    tagline: str = Field(..., max_length=200)
    description: str = Field(..., max_length=1000)


class Hero(BaseModel):
    eyebrow: str = Field(..., max_length=120)
    title: str = Field(..., max_length=200)
    subtitle: str = Field(..., max_length=500)
    primaryCta: str = Field(..., max_length=60)
    secondaryCta: str = Field(..., max_length=60)


class TextSection(BaseModel):
    title: str = Field(..., max_length=200)
    text: str = Field(..., max_length=3000)


class ContactSection(BaseModel):
    title: str = Field(..., max_length=200)
    description: str = Field(..., max_length=1000)


class SiteService(BaseModel):
    id: str = Field(..., max_length=60)
    title: str = Field(..., max_length=120)
    description: str = Field(..., max_length=1000)
    icon: str = Field(..., max_length=60)


class SiteContentIn(BaseModel):
    brand: Brand
    hero: Hero
    about: TextSection
    contact: ContactSection
    services: List[SiteService] = Field(..., max_length=30)


class SiteContent(SiteContentIn):
    updated_at: Optional[str] = None
