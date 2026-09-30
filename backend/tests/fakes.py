from uuid import uuid4


class FakeSnapshot:
    def __init__(self, doc_id, data):
        self.id = doc_id
        self._data = data
        self.exists = data is not None

    def to_dict(self):
        return dict(self._data) if self._data is not None else {}


class FakeDocument:
    def __init__(self, store, collection, doc_id):
        self._store = store
        self._collection = collection
        self.id = doc_id

    def set(self, data, merge=False):
        col = self._store.setdefault(self._collection, {})
        if merge and self.id in col:
            col[self.id] = {**col[self.id], **data}
        else:
            col[self.id] = dict(data)

    def get(self):
        data = self._store.get(self._collection, {}).get(self.id)
        return FakeSnapshot(self.id, data)


class FakeCollection:
    def __init__(self, store, name):
        self._store = store
        self._name = name

    def document(self, doc_id=None):
        return FakeDocument(self._store, self._name, doc_id or uuid4().hex)

    def stream(self):
        return [
            FakeSnapshot(doc_id, data)
            for doc_id, data in self._store.get(self._name, {}).items()
        ]


class FakeDB:
    def __init__(self):
        self._store = {}

    def collection(self, name):
        return FakeCollection(self._store, name)
