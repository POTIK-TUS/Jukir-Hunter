from fastapi import APIRouter
from pathlib import Path
import pandas as pd

router = APIRouter(
    prefix="/api/report",
    tags=["Reports"]
)

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_PATH = BASE_DIR / "data" / "jukir_hunter_dummy_surabaya.csv"

def load_reports():
    df = pd.read_csv(DATA_PATH)
    df = df.dropna(subset=['latitude', 'longitude'])
    return df

@router.get("/")
def get_reports(
    category: str | None = None,
    status: str | None = None
):

    df = load_reports()

    if category:
        df = df[df["category"] == category]

    if status:
        df = df[df["status"] == status]

    features = []

    for _, row in df.iterrows():

        features.append({
            "type": "Feature",

            "geometry": {
                "type": "Point",
                "coordinates": [
                    float(row["longitude"]),
                    float(row["latitude"])
                ]
            },

            "properties": {
                "report_id": row["report_id"],
                "category": row["category"],
                "description": row["description"],
                "location_name": row["location_name"],
                "district": row["district"],
                "status": row["status"],
                "reported_amount": int(row["reported_amount"]),
                "vehicle_type": row["vehicle_type"],
                "created_at": row["created_at"],
                "is_synthetic": bool(row["is_synthetic"])
            }
        })

    return {
        "type": "FeatureCollection",
        "total": len(features),
        "features": features
    }


# GET: Mengambil laporan berdasarkan ID
@router.get("/{report_id}")
def get_report_by_id(report_id: str):

    df = load_reports()

    report = df[df["report_id"] == report_id]

    if report.empty:
        return {
            "message": "Report not found"
        }

    row = report.iloc[0]

    return {
        "report_id": row["report_id"],
        "category": row["category"],
        "description": row["description"],
        "location_name": row["location_name"],
        "district": row["district"],
        "status": row["status"],
        "latitude": float(row["latitude"]),
        "longitude": float(row["longitude"]),
        "reported_amount": int(row["reported_amount"]),
        "created_at": row["created_at"]
    }