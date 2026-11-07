import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-4 text-primary" to="/">
          <span className="me-2"></span> Jukir Hunter
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark" to="/peta-parkir">Peta Parkir</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-docker-primary ms-2" to="/lapor">Ayo LAPOR!</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;