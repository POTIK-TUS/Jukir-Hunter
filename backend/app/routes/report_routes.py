
from fastapi import APIRouter, HTTPException, Query
from pathlib import Path
import json

router = APIRouter(
    prefix="/api/report",
    tags=["Reports"]
)

# ==========================================
# CONFIGURATION
# ==========================================

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_PATH = BASE_DIR / "data" / "dummy_reports.json"


# ==========================================
# LOAD GEOJSON DATA
# ==========================================

def load_reports():

    if not DATA_PATH.exists():
        raise HTTPException(
            status_code=500,
            detail="Report dataset not found"
        )

    try:
        with open(DATA_PATH, "r", encoding="utf-8") as file:
            data = json.load(file)

        if data.get("type") != "FeatureCollection":
            raise ValueError("Invalid GeoJSON FeatureCollection")

        return data

    except (json.JSONDecodeError, ValueError) as error:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to load report data: {str(error)}"
        )


# ==========================================
# GET: ALL REPORTS
# ==========================================

@router.get("/")
def get_reports(
    location: str | None = None
):

    data = load_reports()

    features = data.get("features", [])

    # Filter berdasarkan nama lokasi
    if location:
        features = [
            feature for feature in features
            if feature.get("properties", {})
            .get("location", "").lower() == location.lower()
        ]

    return {
        "type": "FeatureCollection",
        "total": len(features),
        "features": features
    }


# ==========================================
# GET: REPORT BY LOCATION
# ==========================================

@router.get("/location/{location_name}")
def get_report_by_location(location_name: str):

    data = load_reports()

    for feature in data.get("features", []):

        properties = feature.get("properties", {})

        if properties.get("location", "").lower() == location_name.lower():

            longitude, latitude = feature["geometry"]["coordinates"]

            return {
                "location": properties.get("location"),
                "report_count": properties.get("report_count", 0),
                "latitude": latitude,
                "longitude": longitude
            }

    raise HTTPException(
        status_code=404,
        detail="Location not found"
    )
