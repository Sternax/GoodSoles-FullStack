import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="mobile-navbar">
        {/* Hamburger menu */}
        <button className={`menu-button ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Logo */}
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo" />
        </div>

        {/* Cart icon */}
        <button className="cart-button">
          <img src="/shoe-box.png" alt="Cart" className="cart-icon" />
        </button>
      </nav>

      {/* Slide-in menu */}
      <div className={`side-menu ${menuOpen ? 'show' : ''}`}>
        <ul className="menu-items">
          <li onClick={closeMenu}>SNEAKERS</li>
          <li onClick={closeMenu}>SALE</li>
          <li onClick={closeMenu}>ABOUT</li>
          <li onClick={closeMenu}>SIGN IN</li>
        </ul>
      </div>
    </>
  );
}
