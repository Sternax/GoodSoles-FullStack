// import { useState } from 'react';
// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import './App.css';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './components/CartContext.tsx';

const App = () => {
  return (
    <div id="app">
      <CartProvider>
        <Toaster position="top-center" />
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
        <Footer />
      </CartProvider>
    </div>
  );
};

export default App;
