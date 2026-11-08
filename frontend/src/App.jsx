import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menubar from './components/Menubar';
import Footer from './components/Footer';
import SearchBar from './components/common/SearchBar';
import LandingPage from './pages/LandingPage';
import LaporPage from './pages/LaporPage';
import PetaParkirPage from './pages/PetaParkirPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 pb-5 mb-4">
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/lapor" element={<LaporPage />} />
            <Route path="/peta-parkir" element={<PetaParkirPage />} />
          </Routes>
        </main>
        <Menubar />
        <Footer />
      </div>
    </Router>
  );
}

export default App;