import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Documents from './pages/Documents';
import Apropos from './pages/Apropos';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import './App.css'; // ❌ À commenter si le fichier n'existe pas

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/apropos/:id" element={<Apropos />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
