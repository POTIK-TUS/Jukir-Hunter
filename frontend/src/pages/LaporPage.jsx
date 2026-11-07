import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocationPicker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const LaporPage = () => {
  const [formData, setFormData] = useState({
    jenis_pelanggaran: 'Tarif Tidak Sesuai',
    tarif_diminta: '',
    tarif_resmi: '',
    keterangan: '',
  });
  const [position, setPosition] = useState([-7.9666, 112.6326]);
  const [foto, setFoto] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('jenis_pelanggaran', formData.jenis_pelanggaran);
    data.append('tarif_diminta', formData.tarif_diminta);
    data.append('tarif_resmi', formData.tarif_resmi);
    data.append('keterangan', formData.keterangan);
    data.append('latitude', position[0]);
    data.append('longitude', position[1]);
    if (foto) {
      data.append('foto', foto);
    }

    try {
      await axios.post('http://localhost:8000/api/reports/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Laporan Anda berhasil dikirim! Terima kasih atas partisipasinya.');
    } catch (err) {
      console.error(err);
      setMessage('Gagal mengirim laporan. Silakan coba lagi.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="docker-card p-4 p-md-5">
            <h2 className="fw-bold mb-3">Formulir Laporan Pelanggaran Parkir</h2>
            <p className="text-muted mb-4">
              Isi data di bawah ini secara lengkap. Data Anda akan diproses untuk memverifikasi tindakan juru parkir liar.
            </p>

            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Jenis Pelanggaran</label>
                <select 
                  className="form-select" 
                  name="jenis_pelanggaran" 
                  value={formData.jenis_pelanggaran} 
                  onChange={handleChange}
                >
                  <option value="Tarif Tidak Sesuai">Tarif Tidak Sesuai (Di Atas Ketentuan)</option>
                  <option value="Tanpa Karcis">Tanpa Memberikan Karcis Resmi</option>
                  <option value="Titik Parkir Liar">Titik Parkir Liar / Tanpa Izin</option>
                  <option value="Pemaksaan/Kekerasan">Tindakan Intimidasi / Pemaksaan</option>
                </select>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Tarif yang Diminta (Rp)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="tarif_diminta" 
                    value={formData.tarif_diminta} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Tarif Resmi / Seharusnya (Rp)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="tarif_resmi" 
                    value={formData.tarif_resmi} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Keterangan Tambahan / Kronologi Singkat</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  name="keterangan" 
                  value={formData.keterangan} 
                  onChange={handleChange} 
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Foto Bukti (Karcis / Jukir / Area)</label>
                <input 
                  type="file" 
                  className="form-control" 
                  onChange={handleFileChange} 
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Pilih Titik Lokasi pada Peta (Klik Lokasi)</label>
                <div style={{ height: '300px', width: '100%', borderRadius: '6px', overflow: 'hidden' }}>
                  <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationPicker position={position} setPosition={setPosition} />
                  </MapContainer>
                </div>
                <small className="text-muted d-block mt-2">
                  Koordinat terpilih: {position[0].toFixed(5)}, {position[1].toFixed(5)}
                </small>
              </div>

              <button type="submit" className="btn btn-docker-primary w-100 py-2 fs-5">Kirim Laporan</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporPage;
