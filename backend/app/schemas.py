from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ReportBase(BaseModel):
    jenis_pelanggaran: str
    tarif_diminta: int
    tarif_resmi: int
    keterangan: str
    latitude: float
    longitude: float

class ReportCreate(ReportBase):
    pass

class ReportResponse(ReportBase):
    id: int
    foto_bukti: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class HeatmapPoint(BaseModel):
    id: int
    latitude: float
    longitude: float
    weight: float
    status: str
    jenis_pelanggaran: str