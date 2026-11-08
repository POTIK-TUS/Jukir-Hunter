import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container">
      {/* Header Banner */}
      <div className="sj-box p-4 md-5">
        <div className="self-center-safe">
          <span className="font-mono">Validasi Parkir Surabaya</span>
          <h1 className="fw-bold mb-2">Parkir jujur, bayar aman.</h1>
          <p className="mb-3" style={{maxWidth: '600px'}}>
            Karcis sudah ditiadakan. Pastikan QRIS yang Anda bayar milik resmi Pemkot, dan laporkan parkir liar atau tarif tidak wajar langsung ke instansi berwenang.
          </p>
          <div className="mt-8 d-flex flex-wrap gap-2 mb-3">
            <Link to="/cek-qris" className="btn btn-lg bg-white">
              <p className="mb-0 font-bold ">Cek QRIS</p>
            </Link>
            <Link to="/peta-parkir" className="btn btn-lg outline-white border-white">
              <p className="mb-0 text-white font-semibold">Lihat semua menu</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="p-4 mb-4">
        <p className="mb-0 font-mono font-semibold text-gray-400">MASALAHNYA</p>
        <h3 className= "fw-bold line-clamp-2">Bayar digital itu praktis, tapi... rawan salah bayar.</h3>
        <p className="mb-0 text-dark medium" style={{maxWidth: '700px' }}>
          Tanpa karcis, warga hanya mengandalkan QRIS yang diberikan juru parkir. Sehingga warga sulit memastikan QRIS itu resmi atau tidak resmi, serta alur pelaporan yang belum runtut.
        </p>
      </div>

      {/* Cara Pakai Steps */}
      <h5 className="p-2 fw-bold mb-3">CARA PAKAI</h5>
      <div className="row g-3 mb-4">
        {[
          { step: "1", title: "Buka Peta", desc: "Lihat titik parkir resmi, tarif, dan metode bayar." },
          { step: "2", title: "Cek QRIS", desc: "Pindai QRIS sebelum membayar, cocokkan dengan daftar Dishub." },
          { step: "3", title: "Bayar Digital", desc: "QRIS resmi, kartu, atau voucher. Simpan bukti bayar." },
          { step: "4", title: "Lapor Pelanggaran", desc: "Pilih jenis pelanggaran dan kirim laporan." }
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
            <p className="text-muted small mb-0">Hasil resmi, tidak terdaftar, atau perlu hati-hati sebelum Anda membayar.</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="sj-card p-3">
            <h6 className="fw-bold text-inverse">📩 Laporan Terarah</h6>
            <p className="text-muted small mb-0">Tarif dan QRIS ke Dishub. Parkir liar ke Satpol PP atau kepolisian.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;