import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import axios from 'axios';

const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;
    const heatPoints = points.map(p => [p.latitude, p.longitude, p.weight || 0.5]);
    const heat = L.heatLayer(heatPoints, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
};

const LandingPage = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ perluTindakan: [], dalamProses: [], terverifikasi: [] });

  useEffect(() => {
    axios.get('http://localhost:8000/api/reports/heatmap')
      .then(res => {
        setReports(res.data);
        const pt = res.data.filter(r => r.status === 'Perlu Tindakan');
        const dp = res.data.filter(r => r.status === 'Dalam Proses');
        const tv = res.data.filter(r => r.status === 'Terverifikasi');
        setStats({ perluTindakan: pt, dalamProses: dp, terverifikasi: tv });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {/* Hero Header dengan subtle gradient */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title mb-3">JUKIR HUNTER</h1>
          <p className="lead text-muted mb-4 fs-5 mx-auto" style={{ maxWidth: '600px' }}>
            Laporkan keberadaan juru parkir liar dan pantau titik rawan pelanggaran secara transparan dan realtime.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/lapor" className="btn btn-docker-primary btn-lg">Ayo LAPOR!</Link>
            <Link to="/peta-parkir" className="btn btn-docker-outline btn-lg">Peta Parkir</Link>
          </div>
        </div>
      </section>

      {/* Heatmap & Live Status Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="docker-card p-3 h-100">
                <h5 className="fw-bold mb-3">Peta Heatmap Laporan Realtime</h5>
                <div style={{ height: '420px', width: '100%', borderRadius: '6px', overflow: 'hidden' }}>
                  <MapContainer center={[-7.9666, 112.6326]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <HeatmapLayer points={reports} />
                  </MapContainer>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="docker-card p-4 h-100">
                <h5 className="fw-bold mb-3">Keterangan Area</h5>
                <div className="d-flex flex-column gap-3">
                  <div className="p-3 bg-light rounded border-danger border-4">
                    <span className="badge bg-danger mb-1">Perlu Tindakan</span>
                    <div className="fw-bold">Area Terdeteksi High Risk</div>
                    <small className="text-muted">Total: {stats.perluTindakan.length} Titik Laporan</small>
                  </div>
                  <div className="p-3 bg-light rounded border-warning border-4">
                    <span className="badge bg-warning text-dark mb-1">Dalam Proses</span>
                    <div className="fw-bold">Area Penanganan Petugas</div>
                    <small className="text-muted">Total: {stats.dalamProses.length} Titik Laporan</small>
                  </div>
                  <div className="p-3 bg-light rounded border-success border-4">
                    <span className="badge bg-success mb-1">Terverifikasi</span>
                    <div className="fw-bold">Area Steril / Penertiban</div>
                    <small className="text-muted">Total: {stats.terverifikasi.length} Titik Laporan</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Alur Pelaporan */}
      <section className="py-5 bg-light border-top border-bottom">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Alur Pelaporan</h2>
          <div className="row g-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="col-md-3">
                <div className="docker-card p-3 text-center h-100">
                  <div className="bg-secondary bg-opacity-10 rounded mb-3 d-flex align-items-center justify-content-center" style={{ height: '160px' }}>
                    {/* Placeholder Embed Foto */}
                    <span className="text-muted small">[ Embed Foto Step {step} ]</span>
                  </div>
                  <h6 className="fw-bold">Langkah {step}</h6>
                  <p className="text-muted small mb-0">Deskripsi singkat alur pelaporan juru parkir liar langkah ke-{step}.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contoh Pelaporan */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Contoh Pelaporan</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="docker-card p-4">
                <div className="badge bg-danger mb-2">Pelanggaran Tarif</div>
                <h5 className="fw-bold">Parkir Minimarket X</h5>
                <p className="text-muted small">Diminta Rp 5.000 padahal tarif resmi Rp 2.000 dan tidak ada karcis.</p>
                <div className="docker-code-box">
                  <code>STATUS: TERVERIFIKASI_PETUGAS</code>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="docker-card p-4">
                <div className="badge bg-warning text-dark mb-2">Jukir Tanpa KTA</div>
                <h5 className="fw-bold">Kawasan Kuliner Y</h5>
                <p className="text-muted small">Oknum menarik biaya tanpa atribut dan karcis resmi daerah.</p>
                <div className="docker-code-box">
                  <code>STATUS: DALAM_PROSES_INVESTIGASI</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;