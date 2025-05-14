// import { useState } from 'react';
// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import './App.css';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';

const App = () => {
  return (
    <div id='app'>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
