import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-light bg-white px-3 sticky-top container">
      <Link className="navbar-brand d-flex align-items-center gap-1" to="/">
        <p className="font-bold mb-0 text-green-800">Jukir Hunter</p>
        <p className="font-bold ml-1 mb-0">Suroboyo</p>
      </Link>
      <Link to="/peta-parkir" className="btn">
      <p className="mb-0 text-green-800 font-semibold">Lihat Peta</p>
      </Link>
    </nav>
  );
};

export default Header;
