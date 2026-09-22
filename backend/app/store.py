from datetime import datetime, timezone
from typing import Any, Optional

from app.firebase import get_db


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _as_dict(snapshot) -> dict[str, Any]:
    data = snapshot.to_dict() or {}
    return {"id": snapshot.id, **data}


def list_docs(collection: str) -> list[dict[str, Any]]:
    docs = list(get_db().collection(collection).stream())
    return [_as_dict(doc) for doc in docs]


def get_doc(collection: str, doc_id: str) -> Optional[dict[str, Any]]:
    snapshot = get_db().collection(collection).document(doc_id).get()
    if not snapshot.exists:
        return None
    return _as_dict(snapshot)


def create_doc(collection: str, payload: dict[str, Any]) -> dict[str, Any]:
    body = {**payload, "created_at": _now(), "updated_at": _now()}
    ref = get_db().collection(collection).document()
    ref.set(body)
    return {"id": ref.id, **body}


def update_doc(
    collection: str, doc_id: str, patch: dict[str, Any]
) -> Optional[dict[str, Any]]:
    current = get_doc(collection, doc_id)
    if current is None:
        return None
    body = {k: v for k, v in current.items() if k != "id"}
    body.update({k: v for k, v in patch.items() if v is not None})
    body["updated_at"] = _now()
    get_db().collection(collection).document(doc_id).set(body, merge=True)
    return {"id": doc_id, **body}


def set_doc(collection: str, doc_id: str, payload: dict[str, Any]) -> dict[str, Any]:
    body = dict(payload)
    get_db().collection(collection).document(doc_id).set(body, merge=True)
    return {"id": doc_id, **body}


def delete_doc(collection: str, doc_id: str) -> bool:
    doc = get_doc(collection, doc_id)
    if doc is None:
        return False
    get_db().collection(collection).document(doc_id).delete()
    return True


def find_docs(collection: str, field: str, value: Any) -> list[dict[str, Any]]:
    return [doc for doc in list_docs(collection) if doc.get(field) == value]
