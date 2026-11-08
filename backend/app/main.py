from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import report_routes

app = FastAPI(
    title="Jukir Hunter API",
    description="API pelaporan parkir liar Kota Surabaya",
    version="1.0.0"
)

app.include_router(report_routes.router)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Register Routes
app.include_router(report_routes.router)


@app.get("/")
def home():
    return {
        "message": "Jukir Hunter API is running",
        "status": "success"
    }
