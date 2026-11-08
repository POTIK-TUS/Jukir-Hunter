import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Menubar from './components/Menubar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import PetaParkirPage from './pages/PetaParkirPage';
import LaporPage from './pages/LaporPage';
import CekQRISPage from './pages/CekQRISPage';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/peta-parkir" element={<PetaParkirPage />} />
          <Route path="/cek-qris" element={<CekQRISPage />} />
          <Route path="/lapor" element={<LaporPage />} />
        </Routes>
      </main>
      <Footer />
      <Menubar />
    </Router>
  );
}

export default App;
