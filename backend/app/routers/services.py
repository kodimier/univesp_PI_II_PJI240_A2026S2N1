from fastapi import APIRouter
from app.models.service import Service
from app.firebase import get_db
from typing import List

router = APIRouter(tags=["Serviços"])

_DEFAULT_SERVICES: List[Service] = [
    Service(
        id="avcb",
        title="AVCB",
        description=(
            "Auto de Vistoria do Corpo de Bombeiros: avaliação completa "
            "para certificação de segurança contra incêndios."
        ),
        icon="shield",
    ),
    Service(
        id="clcb",
        title="CLCB",
        description=(
            "Certificado de Licença do Corpo de Bombeiros para edificações "
            "que se enquadram nos critérios simplificados."
        ),
        icon="certificate",
    ),
    Service(
        id="laudos",
        title="Laudos Técnicos",
        description=(
            "Elaboração de laudos técnicos de segurança contra incêndios "
            "em conformidade com as normas vigentes."
        ),
        icon="document",
    ),
    Service(
        id="consultoria",
        title="Consultoria",
        description=(
            "Consultoria especializada em engenharia de segurança contra "
            "incêndios para projetos e adequações."
        ),
        icon="users",
    ),
]


@router.get("/services", response_model=List[Service])
def list_services():
    try:
        db = get_db()
        docs = list(db.collection("services").stream())
        if docs:
            return [Service(id=doc.id, **doc.to_dict()) for doc in docs]
    except Exception:
        pass
    return _DEFAULT_SERVICES
