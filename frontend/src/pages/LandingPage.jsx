import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container py-2">
      {/* Header Banner */}
      <div className="sj-box p-4 p-md-5">
        <h1 className="fw-bold mb-2">Parkir jujur, bayar aman.</h1>
        <p className=" fs-10 mb-3" style={{ maxWidth: '600px' }}>
          Karcis sudah ditiadakan. Pastikan QRIS yang Anda bayar milik resmi Pemkot, dan laporkan parkir liar atau tarif tidak wajar langsung ke instansi berwenang.
        </p>
        <div className="d-flex flex-wrap gap-2">
          <Link to="/cek-qris" className="btn btn-warning btn-lg">
            Cek QRIS
          </Link>
          <Link to="/peta-parkir" className="btn btn-success btn-lg px-3">
            Buka Peta Parkir
          </Link>
        </div>
      </div>

      {/* Problem Section */}
      <div className="p-4 mb-4">
        <p className="mb-0 text-dark medium">
          Bayar digital itu praktis, tapi rawan salah bayar. Tanpa karcis, warga hanya mengandalkan QRIS yang disodorkan juru parkir. Warga sulit memastikan QRIS itu resmi, dan laporan pelanggaran belum punya jalur yang jelas.
        </p>
      </div>

      {/* Cara Pakai Steps */}
      <h5 className="fw-bold mb-3">CARA PAKAI</h5>
      <div className="row g-3 mb-4">
        {[
          { step: "1", title: "Buka Peta", desc: "Lihat titik parkir resmi, tarif, dan metode bayar[cite: 14]." },
          { step: "2", title: "Cek QRIS", desc: "Pindai QRIS sebelum membayar, cocokkan dengan daftar Dishub[cite: 14]." },
          { step: "3", title: "Bayar Digital", desc: "QRIS resmi, kartu, atau voucher. Simpan bukti bayar[cite: 14]." },
          { step: "4", title: "Lapor Pelanggaran", desc: "Pilih jenis pelanggaran dan kirim laporan[cite: 11, 14]." }
        ].map((item) => (
          <div key={item.step} className="col-6 col-md-3">
            <div className="sj-card p-3 h-100">
              <div className="badge bg-success rounded-circle mb-2" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.step}
              </div>
              <h6 className="fw-bold mb-1">{item.title}</h6>
              <p className="text-muted small mb-0">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fitur Utama */}
      <h5 className="fw-bold mb-3">FITUR UTAMA</h5>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="sj-card p-3">
            <h6 className="fw-bold text-inverse">🔍 Cek QRIS</h6>
            <p className="text-muted small mb-0">Hasil resmi, tidak terdaftar, atau perlu hati-hati sebelum Anda membayar[cite: 14].</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="sj-card p-3">
            <h6 className="fw-bold text-inverse">📩 Laporan Terarah</h6>
            <p className="text-muted small mb-0">Tarif dan QRIS ke Dishub. Parkir liar ke Satpol PP atau kepolisian[cite: 14].</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;