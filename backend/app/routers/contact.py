from fastapi import APIRouter, HTTPException

from app.collections import CONTACTS, LEADS
from app.models.contact import ContactForm, ContactResponse
from app.store import create_doc

router = APIRouter(tags=["Contato"])


@router.post("/contact", response_model=ContactResponse, status_code=201)
def submit_contact(form: ContactForm):
    try:
        payload = form.model_dump(mode="json")
        contact = create_doc(CONTACTS, {**payload, "status": "pending"})
        create_doc(
            LEADS,
            {
                "name": form.name,
                "email": str(form.email),
                "phone": form.phone,
                "origin": "landing",
                "status": "novo",
                "message": form.message,
            },
        )
        return ContactResponse(
            id=contact["id"],
            message="Mensagem enviada com sucesso.",
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Erro ao salvar mensagem.") from exc
