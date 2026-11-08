import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShieldCheck, ArrowRight } from 'lucide-react';

const Menubar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Peta Parkir', path: '/peta-parkir' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-top fixed-bottom py-2 shadow-lg" style={{ zIndex: 1050 }}>
      <div className="container">

        {/* Logo */}
        <Link
          className="navbar-brand d-flex align-items-center fw-bold fs-4 text-primary"
          to="/"
          onClick={() => setIsOpen(false)}
        >
          <ShieldCheck size={30} className="me-2" />
          Jukir Hunter
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Navigation */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">

            {navLinks.map((link) => (
              <li className="nav-item" key={link.path}>
                <Link
                  className="nav-link fw-semibold text-dark"
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* CTA */}
            <li className="nav-item">
              <Link
                className="btn btn-primary fw-semibold ms-lg-2 px-4 py-2 d-flex align-items-center justify-content-center gap-2"
                to="/lapor"
                onClick={() => setIsOpen(false)}
              >
                Ayo LAPOR!
                <ArrowRight size={18} />
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Menubar;
