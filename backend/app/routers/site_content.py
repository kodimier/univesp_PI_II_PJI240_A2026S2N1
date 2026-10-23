from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException

from app.auth import require_crm_token
from app.collections import SITE
from app.models.site_content import SiteContent, SiteContentIn
from app.store import get_doc, set_doc

router = APIRouter(tags=["Conteúdo do site"])

# Documento único com os textos da landing editados no CRM.
_DOC_ID = "content"


@router.get("/site-content", response_model=SiteContent)
def get_site_content():
    doc = get_doc(SITE, _DOC_ID)
    if doc is None:
        raise HTTPException(status_code=404, detail="Conteúdo ainda não publicado.")
    return SiteContent.model_validate(doc)


@router.put(
    "/site-content",
    response_model=SiteContent,
    dependencies=[Depends(require_crm_token)],
)
def save_site_content(payload: SiteContentIn):
    body = {
        **payload.model_dump(mode="json"),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    return SiteContent.model_validate(set_doc(SITE, _DOC_ID, body))
