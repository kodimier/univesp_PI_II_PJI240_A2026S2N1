import os
from pathlib import Path
from fastapi import APIRouter, Request
from typing import List
from app.models.asset import Asset

router = APIRouter(tags=["Assets"])

_MIME = {
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
}

_PUBLIC_DIR = Path(__file__).parent.parent.parent / "public"


def _scan_assets(request: Request) -> List[Asset]:
    base_url = str(request.base_url).rstrip("/")
    assets: List[Asset] = []

    for category_dir in sorted(_PUBLIC_DIR.iterdir()):
        if not category_dir.is_dir():
            continue
        category = category_dir.name
        for file in sorted(category_dir.iterdir()):
            if file.suffix.lower() not in _MIME:
                continue
            asset_id = f"{category}/{file.stem}"
            assets.append(
                Asset(
                    id=asset_id,
                    name=file.stem,
                    url=f"{base_url}/static/{category}/{file.name}",
                    mime_type=_MIME[file.suffix.lower()],
                    category=category,
                )
            )

    return assets


@router.get("/assets", response_model=List[Asset])
def list_assets(request: Request):
    return _scan_assets(request)
