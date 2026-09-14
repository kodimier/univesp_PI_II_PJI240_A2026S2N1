import sys
from unittest.mock import MagicMock

_firebase_stub = MagicMock()
_firebase_stub._apps = ["stub"]
sys.modules.setdefault("firebase_admin", _firebase_stub)
sys.modules.setdefault("firebase_admin.credentials", _firebase_stub)
sys.modules.setdefault("firebase_admin.firestore", _firebase_stub.firestore)

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from tests.fakes import FakeDB  # noqa: E402


@pytest.fixture
def client():
    from app.firebase import reset_db

    fake_db = FakeDB()
    _firebase_stub.firestore.client.return_value = fake_db
    reset_db()

    from main import app

    yield TestClient(app)
    reset_db()
