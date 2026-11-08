import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CekQRISPage = () => {
  const [scanResult, setScanResult] = useState({
    status: 'unverified', // 'unverified', 'verified', 'scanning'
    qrisName: 'Warung Kopi Jaya',
    note: 'QRIS ini atas nama warung, tidak ada di daftar QRIS resmi Pemkot Surabaya. Sebaiknya pembayaran tidak dilanjutkan.',
  });

  return (
    <div className="container py-4">
      {/* Header Halaman */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Cek QRIS Parkir</h4>
          <p className="text-muted small mb-0">Verifikasi keaslian QRIS juru parkir resmi Pemkot Surabaya sebelum membayar.</p>
        </div>
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          Kembali
        </Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 sj-card shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Hasil Verifikasi QRIS</h5>

              {/* Status Peringatan / Verifikasi */}
              <div className="p-3 mb-3 rounded bg-warning-subtle border border-warning text-dark">
                <div className="fw-bold mb-1 d-flex align-items-center gap-1">
                  <span>⚠️</span> Belum Terverifikasi Resmi
                </div>
                <div className="small">
                  {scanResult.note}
                </div>
              </div>

              {/* Petunjuk Memeriksa Jukir Fisik */}
              <div className="p-3 bg-light rounded mb-4">
                <strong className="d-block mb-2 text-dark small">Periksa juga atribut jukir resmi:</strong>
                <ul className="mb-0 ps-3 text-muted small">
                  <li>Memakai rompi resmi (misal: rompi merah Dishub)</li>
                  <li>Membawa peluit operasional</li>
                  <li>Memiliki Kartu Tanda Anggota (KTA) aktif</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-2">
                <button 
                  className="btn btn-outline-secondary flex-fill"
                  onClick={() => alert('Fitur kamera/pemindai sedang aktif!')}
                >
                  Pindai Ulang
                </button>
                <Link to="/lapor" className="btn btn-danger flex-fill text-center">
                  Laporkan QRIS Ini
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CekQRISPage;
