import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-top py-5 bg-white mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold text-primary mb-3">jukir hunter</h5>
            <p className="text-muted small">
              Platform partisipasi publik untuk pemetaan dan pelaporan operasional juru parkir liar secara realtime.
            </p>
          </div>
          <div className="col-md-2 offset-md-2">
            <h6 className="fw-bold mb-3">Navigasi</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/" className="text-decoration-none text-muted">Beranda</Link></li>
              <li><Link to="/lapor" className="text-decoration-none text-muted">Lapor Pelanggaran</Link></li>
              <li><Link to="/peta-parkir" className="text-decoration-none text-muted">Peta Parkir</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold mb-3">Transparansi Data</h6>
            <p className="text-muted small">
              Data yang dihimpun digunakan secara terbuka untuk tindak lanjut pihak berwenang.
            </p>
          </div>
        </div>
        <div className="border-top mt-4 pt-4 text-center text-muted small">
          © {new Date().getFullYear()} Jukir Hunter. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;