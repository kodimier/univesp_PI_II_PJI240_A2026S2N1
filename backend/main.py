import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from app.firebase import get_db
from app.routers import assets, attendants, cnpj, contact, leads, services, whatsapp

load_dotenv()

app = FastAPI(
    title="PG AVCB API",
    description=(
        "Backend da landing page e do CRM da PG AVCB Engenharia contra Incêndio"
    ),
    version="0.4.0",
)

_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in _origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_public_dir = Path(__file__).parent / "public"
app.mount("/static", StaticFiles(directory=_public_dir), name="static")

app.include_router(contact.router, prefix="/api")
app.include_router(services.router, prefix="/api")
app.include_router(assets.router, prefix="/api")
app.include_router(leads.router, prefix="/api")
app.include_router(attendants.router, prefix="/api")
app.include_router(cnpj.router, prefix="/api")
app.include_router(whatsapp.router, prefix="/api")


@app.get("/api/health", tags=["Health"])
def health():
    return {"status": "ok"}


@app.get("/api/health/ready", tags=["Health"])
def ready():
    firebase_ok = False
    try:
        get_db()
        firebase_ok = True
    except Exception:
        pass
    return {
        "status": "ok",
        "firebase": firebase_ok,
        "crm_auth": bool(os.getenv("CRM_API_TOKEN", "").strip()),
    }
