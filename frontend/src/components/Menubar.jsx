import React from 'react';
import { NavLink } from 'react-router-dom';

const Menubar = () => {
  return (
    <nav className="bottom-menubar shadow-sm">
      <NavLink to="/peta-parkir" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
        <span className="nav-icon">🗺️</span>
        <span>Peta</span>
      </NavLink>

      <NavLink to="/cek-qris" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
        <span className="nav-icon">🔍</span>
        <span>Cek QRIS</span>
      </NavLink>

      <NavLink to="/lapor" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
        <span className="nav-icon">⚠️</span>
        <span>Lapor</span>
      </NavLink>
    </nav>
  );
};

export default Menubar;
