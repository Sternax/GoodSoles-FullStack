// import { useState } from 'react';
// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import LoginSuccessPage from './pages/LoginSuccessPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import './App.css';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import CartPage from './pages/CartPage.tsx';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './components/CartContext.tsx';

const App = () => {
  return (
    <div id="app">
      <Router>
        <CartProvider>
          <Toaster position="top-center" />
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login-success" element={<LoginSuccessPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>

          <Footer />
        </CartProvider>
      </Router>
    </div>
  );
};

export default App;
