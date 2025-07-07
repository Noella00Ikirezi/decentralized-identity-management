import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Documents from './pages/Documents';
import Apropos from './pages/Apropos';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/apropos/:id" element={<Apropos />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
