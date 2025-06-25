import React from 'react';
import './App.css';
import AppRoutes from './components/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
};

export default App;
