VENV := .venv
PYTHON := $(VENV)/Scripts/python
PIP := $(VENV)/Scripts/pip
UVICORN := $(VENV)/Scripts/uvicorn

.PHONY: install dev lint format test clean

install:
	python -m venv $(VENV)
	$(PIP) install --upgrade pip
	$(PIP) install -r requirements.txt
	$(PIP) install ruff pytest httpx

dev:
	$(UVICORN) main:app --reload --host 0.0.0.0 --port 8000

lint:
	$(VENV)/Scripts/ruff check .

format:
	$(VENV)/Scripts/ruff format .

test:
	$(PYTHON) -m pytest tests/ -v

clean:
	rm -rf __pycache__ app/__pycache__ app/routers/__pycache__ app/models/__pycache__
	rm -rf .pytest_cache
