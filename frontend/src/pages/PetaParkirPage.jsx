import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

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

const PetaParkirPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/reports/')
      .then(res => {
        setReports(res.data);
        setFilteredReports(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      setFilteredReports(reports);
      return;
    }
    const filtered = reports.filter(r => 
      r.keterangan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.jenis_pelanggaran.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReports(filtered);
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Peta Lokasi & Status Parkir</h2>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group input-group-lg docker-card p-1">
          <input 
            type="text" 
            className="form-control border-0 shadow-none" 
            placeholder="Cari lokasi parkir atau kata kunci..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-docker-primary px-4" type="submit">Cari Area</button>
        </div>
      </form>

      {/* Peta Parkir dengan Heatmap & Marker */}
      <div className="docker-card p-3 mb-5">
        <div style={{ height: '500px', width: '100%', borderRadius: '6px', overflow: 'hidden' }}>
          <MapContainer center={[-7.9666, 112.6326]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <HeatmapLayer points={reports.map(r => ({ latitude: r.latitude, longitude: r.longitude, weight: 0.7 }))} />
            {filteredReports.map((report) => (
              <Marker key={report.id} position={[report.latitude, report.longitude]}>
                <Popup>
                  <div>
                    <span className="badge bg-danger mb-1">{report.jenis_pelanggaran}</span>
                    <h6 className="fw-bold mb-1">{report.keterangan}</h6>
                    <small>Tarif diminta: Rp {report.tarif_diminta} (Resmi: Rp {report.tarif_resmi})</small><br />
                    <small className="text-muted">Status: {report.status}</small>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Hasil Searching / List Status Resmi Area */}
      <h4 className="fw-bold mb-3">Daftar Status Laporan Area Parkir</h4>
      <div className="row g-3">
        {filteredReports.map((report) => (
          <div key={report.id} className="col-md-6">
            <div className="docker-card p-3 d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-1">{report.jenis_pelanggaran}</h6>
                <p className="text-muted small mb-0">{report.keterangan}</p>
                <small className="text-primary">Koordinat: {report.latitude}, {report.longitude}</small>
              </div>
              <span className={`badge ${report.status === 'Terverifikasi' ? 'bg-success' : 'bg-warning text-dark'}`}>
                {report.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetaParkirPage;