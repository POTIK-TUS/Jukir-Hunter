import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import SearchBar from '../components/common/SearchBar';
import 'leaflet/dist/leaflet.css';

const PetaParkirPage = () => {
  const [activeTab, setActiveTab] = useState('resmi'); // 'resmi' | 'laporan'
  const [searchQuery, setSearchQuery] = useState('Jl. Tunjungan, Surabaya');
  const [reports, setReports] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState({
    nama: 'Parkir tepi jalan, Jl. Tunjungan',
    tarifMotor: 2000,
    tarifMobil: 5000,
    metode: 'QRIS, kartu, voucher',
    infoJukir: 'Jukir resmi memakai rompi merah, peluit, dan kartu tanda anggota (KTA)[cite: 8].'
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/reports/')
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container py-3">
      {/* Top Search Bar */}
      <div className="mb-3">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Filter Tabs Mockup 1 */}
      <div className="d-flex gap-2 mb-3">
        <button
          className={`btn btn-sm rounded-pill px-3 ${activeTab === 'resmi' ? 'btn-success' : 'btn-outline-secondary bg-white'}`}
          onClick={() => setActiveTab('resmi')}
        >
          Titik resmi
        </button>
        <button
          className={`btn btn-sm rounded-pill px-3 ${activeTab === 'laporan' ? 'btn-warning text-dark' : 'btn-outline-secondary bg-white'}`}
          onClick={() => setActiveTab('laporan')}
        >
          Laporan warga
        </button>
      </div>

      {/* Leaflet Map Display */}
      <div className="sj-card overflow-hidden mb-3" style={{ height: '350px' }}>
        <MapContainer center={[-7.2575, 112.7378]} zoom={14} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {reports.map((r) => (
            <Marker key={r.id} position={[r.latitude, r.longitude]}>
              <Popup>
                <div>
                  <strong>{r.jenis_pelanggaran}</strong><br/>
                  <small>{r.keterangan}</small>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Bottom Spot Detail Card (Mockup 1) */}
      <div className="sj-card p-3">
        <h6 className="fw-bold mb-1">{selectedSpot.nama}</h6>
        <p className="text-muted small mb-3">
          Titik resmi Dishub. Tanpa karcis: bayar QRIS resmi, kartu, atau voucher[cite: 8].
        </p>

        <div className="row text-center border-top border-bottom py-2 mb-3 g-0">
          <div className="col-6 border-end">
            <small className="text-muted d-block">Motor</small>
            <strong className="text-dark">Rp {selectedSpot.tarifMotor}</strong>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Mobil</small>
            <strong className="text-dark">Rp {selectedSpot.tarifMobil}</strong>
          </div>
        </div>

        <div className="bg-light p-2 rounded mb-2 small">
          <strong>Metode bayar:</strong> {selectedSpot.metode}
        </div>
        <p className="small text-secondary mb-0">
          💡 {selectedSpot.infoJukir}
        </p>
      </div>
    </div>
  );
};

export default PetaParkirPage;