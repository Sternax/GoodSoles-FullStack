// import { useState } from 'react';
// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import './App.css';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import CartPage from './pages/CartPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import FavoritesPage from './pages/FavoritesPage.tsx';
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
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>

          <Footer />
        </CartProvider>
      </Router>
    </div>
  );
};

export default App;
