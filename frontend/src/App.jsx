import React from 'react';
<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Documents from './pages/Documents';
import Apropos from './pages/Apropos';
=======
import './App.css';
import AppRoutes from './components/AppRoutes';
>>>>>>> 033a0c7cf4583b98f5ecba33ed7edf0aa16cd4bf
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
