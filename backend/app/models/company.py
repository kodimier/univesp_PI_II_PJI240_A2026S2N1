from typing import Optional

from pydantic import BaseModel, Field, field_validator


class Company(BaseModel):
    """Cadastro de empresa preenchido via BrasilAPI (CNPJ)."""

    cnpj: str
    razao_social: Optional[str] = None
    nome_fantasia: Optional[str] = None
    descricao_situacao_cadastral: Optional[str] = None
    logradouro: Optional[str] = None
    numero: Optional[str] = None
    bairro: Optional[str] = None
    municipio: Optional[str] = None
    uf: Optional[str] = Field(None, max_length=2)
    cep: Optional[str] = None
    fetched_at: str

    @field_validator("cnpj")
    @classmethod
    def normalize_cnpj(cls, value: str) -> str:
        digits = "".join(ch for ch in value if ch.isdigit())
        if len(digits) != 14:
            raise ValueError("CNPJ deve ter 14 dígitos")
        return digits
