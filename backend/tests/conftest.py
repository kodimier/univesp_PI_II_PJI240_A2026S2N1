import sys
from unittest.mock import MagicMock

# Stub out firebase_admin before any app code is imported so the
# native cryptography/cffi extensions are never loaded in tests.
_firebase_stub = MagicMock()
_firestore_stub = MagicMock()
sys.modules.setdefault("firebase_admin", _firebase_stub)
sys.modules.setdefault("firebase_admin.credentials", _firebase_stub)
sys.modules.setdefault("firebase_admin.firestore", _firestore_stub)

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402


def _make_mock_db():
    db = MagicMock()
    db.collection.return_value.stream.side_effect = Exception("no firebase in tests")
    db.collection.return_value.document.return_value.set.side_effect = Exception("no firebase in tests")
    return db


@pytest.fixture(scope="session")
def client():
    mock_db = _make_mock_db()
    _firestore_stub.client.return_value = mock_db

    from main import app
    yield TestClient(app)
