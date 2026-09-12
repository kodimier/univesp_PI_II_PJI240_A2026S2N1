from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException
from app.models.contact import ContactForm, ContactResponse
from app.firebase import get_db

router = APIRouter(tags=["Contato"])


@router.post("/contact", response_model=ContactResponse, status_code=201)
def submit_contact(form: ContactForm):
    try:
        db = get_db()
        doc_ref = db.collection("contacts").document()
        doc_ref.set({
            **form.model_dump(),
            "created_at": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        })
        return ContactResponse(id=doc_ref.id, message="Mensagem enviada com sucesso.")
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Erro ao salvar mensagem.") from exc
