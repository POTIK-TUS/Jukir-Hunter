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
      <main className= "container bg-white border shadow p-0">
      <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/peta-parkir" element={<PetaParkirPage />} />
          <Route path="/cek-qris" element={<CekQRISPage />} />
          <Route path="/lapor" element={<LaporPage />} />
        </Routes>
      <Footer />
      <Menubar />
      </main>
    </Router>
  );
}

export default App;
