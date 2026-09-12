import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from app.routers import contact, services, assets

load_dotenv()

app = FastAPI(
    title="PG AVCB API",
    description="Backend da landing page PG AVCB Engenharia contra Incêndio",
    version="0.1.0",
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


@app.get("/api/health", tags=["Health"])
def health():
    return {"status": "ok"}
