from sqlalchemy import Column, Integer, String, Text, Float, DateTime, Enum as SQLEnum
from geoalchemy2 import Geometry
from datetime import datetime
import enum
from .database import Base

class StatusPelaporan(str, enum.Enum):
    PERLU_TINDAKAN = "Perlu Tindakan"
    DALAM_PROSES = "Dalam Proses"
    TERVERIFIKASI = "Terverifikasi"

class JenisPelanggaran(str, enum.Enum):
    TARIF_TIDAK_SESUAI = "Tarif Tidak Sesuai"
    TANPA_KARTU_PARKIR = "Tanpa Tiket/Karcis"
    LOKASI_DILARANG = "Parkir di Area Dilarang"
    JUKIR_LIAR = "Juru Parkir Tanpa Seragam/KTA"

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_order=True, primary_key=True, index=True)
    jenis_pelanggaran = Column(SQLEnum(JenisPelanggaran), nullable=False)
    tarif_diminta = Column(Integer, nullable=False)
    tarif_resmi = Column(Integer, nullable=False)
    foto_bukti = Column(String, nullable=True)
    keterangan = Column(Text, nullable=False)
    status = Column(SQLEnum(StatusPelaporan), default=StatusPelaporan.PERLU_TINDAKAN)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    location = Column(Geometry(geometry_type='POINT', srid=4326))
    created_at = Column(DateTime, default=datetime.utcnow)