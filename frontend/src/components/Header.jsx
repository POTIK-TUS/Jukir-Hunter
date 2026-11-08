import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-light bg-white border-bottom px-3 sticky-top">
      <Link className="navbar-brand fw-bold text-inverse d-flex align-items-center gap-1" to="/">
        Jukir Hunter Suroboyo
      </Link>
    </nav>
  );
};

export default Header;
