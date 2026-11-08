import React, { useState } from 'react';
import axios from 'axios';

const LaporPage = () => {
  const [jenisPelanggaran, setJenisPelanggaran] = useState([]);
  const [tarifDiminta, setTarifDiminta] = useState('');
  const [tarifResmi, setTarifResmi] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [foto, setFoto] = useState(null);
  const [locationText] = useState('Jl. Tunjungan, Surabaya');
  const [statusMsg, setStatusMsg] = useState('');

  const listPilihan = [
    "Menolak bayar digital/minta tunai",
    "Tarif melebihi ketentuan",
    "QRIS bukan milik Pemkot",
    "Jukir tanpa atribut resmi",
    "Parkir di rambu larangan"
  ];

  const handleCheckboxChange = (item) => {
    if (jenisPelanggaran.includes(item)) {
      setJenisPelanggaran(jenisPelanggaran.filter(i => i !== item));
    } else {
      setJenisPelanggaran([...jenisPelanggaran, item]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('jenis_pelanggaran', jenisPelanggaran.join(', ') || 'Pelanggaran Parkir');
    data.append('tarif_diminta', tarifDiminta || 0);
    data.append('tarif_resmi', tarifResmi || 0);
    data.append('keterangan', keterangan);
    data.append('latitude', -7.2575);
    data.append('longitude', 112.7378);
    if (foto) data.append('foto', foto);

    try {
      await axios.post('http://localhost:8000/api/reports/', data);
      setStatusMsg('Laporan berhasil dikirim! Identitas Anda tetap dilindungi[cite: 11, 13].');
    } catch (err) {
      console.error(err);
      setStatusMsg('Gagal mengirim laporan. Pastikan koneksi backend aktif.');
    }
  };

  return (
    <div className="container py-3">
      <div className="sj-card p-4">
        <h4 className="fw-bold mb-3">Lapor Pelanggaran</h4>
        <div className="sj-card d-flex align-items-center gap-2 mb-3">
          <span className="badge bg-success-subtle text-success">Privasi terjaga</span>
          <small className="text-muted">Wajah & plat nomor dikaburkan otomatis.</small>
        </div>

        {statusMsg && <div className="alert alert-info small">{statusMsg}</div>}

        <form onSubmit={handleSubmit}>
          {/* Lokasi Otomatis */}
          <div className="mb-3">
            <label className="form-label small text-muted mb-1">Lokasi otomatis</label>
            <input type="text" className="form-control bg-light" value={locationText} readOnly />
          </div>

          {/* Checklist Pelanggaran Mockup 4 */}
          <div className="mb-3">
            <label className="form-label fw-bold small">Jenis pelanggaran</label>
            {listPilihan.map((item, idx) => (
              <div className="form-check mb-2" key={idx}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`chk-${idx}`}
                  checked={jenisPelanggaran.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                />
                <label className="form-check-label small" htmlFor={`chk-${idx}`}>
                  {item}
                </label>
              </div>
            ))}
          </div>

          {/* Tarif */}
          <div className="row g-2 mb-3">
            <div className="col-6">
              <label className="form-label small">Tarif Diminta (Rp)</label>
              <input 
                type="number" 
                className="form-control" 
                value={tarifDiminta} 
                onChange={(e) => setTarifDiminta(e.target.value)} 
                placeholder="5000"
              />
            </div>
            <div className="col-6">
              <label className="form-label small">Tarif Resmi (Rp)</label>
              <input 
                type="number" 
                className="form-control" 
                value={tarifResmi} 
                onChange={(e) => setTarifResmi(e.target.value)} 
                placeholder="2000"
              />
            </div>
          </div>

          {/* Foto Bukti */}
          <div className="mb-3">
            <label className="form-label small">Unggah Bukti (Opsional)</label>
            <input type="file" className="form-control" onChange={(e) => setFoto(e.target.files[0])} />
          </div>

          {/* Keterangan Kronologi */}
          <div className="mb-4">
            <label className="form-label small">Keterangan Kejadian</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Tuliskan detail kejadian..."
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
            Kirim laporan
          </button>
        </form>
      </div>
    </div>
  );
};

export default LaporPage;