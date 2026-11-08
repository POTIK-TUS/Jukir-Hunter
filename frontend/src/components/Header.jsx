import React from 'react';
import { Link } from 'react-router-dom';
import LogoJukirParkir from '../assets/jukir-hunter.jpg';

const Header = () => {
  return (
    <nav className="navbar navbar-light bg-white px-3 sticky-top container">
      <Link className="navbar-brand d-flex align-items-center gap-1" to="/">
        <img src={LogoJukirParkir} alt="logo" className="" style={{ width: '50px', height: 'auto'}}/>
      </Link>
      <Link to="/peta-parkir" className="btn">
      <p className="mb-0 font-bold">Lihat Peta</p>
      </Link>
    </nav>
  );
};

export default Header;
