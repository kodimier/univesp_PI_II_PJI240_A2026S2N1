import os

from fastapi import Header, HTTPException


def require_crm_token(
    authorization: str | None = Header(default=None),
    x_api_key: str | None = Header(default=None, alias="X-API-Key"),
) -> None:
    """Protege rotas do painel quando CRM_API_TOKEN está definido.

    Sem token no ambiente, o protótipo permanece aberto (desenvolvimento).
    O webhook do WhatsApp não usa esta dependência: a Meta precisa acessá-lo.
    """
    expected = os.getenv("CRM_API_TOKEN", "").strip()
    if not expected:
        return
    bearer = None
    if authorization and authorization.lower().startswith("bearer "):
        bearer = authorization.split(" ", 1)[1].strip()
    provided = x_api_key or bearer
    if provided != expected:
        raise HTTPException(status_code=401, detail="Não autorizado.")
