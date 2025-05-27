import { useState } from 'react';
import './Navbar.css';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const { cart } = useCart();

  return (
    <>
      <nav className="mobile-navbar">
        {/* Hamburger menu */}
        <button
          className={`menu-button ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Logo */}
        <div className="logo-container">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="logo" />
          </Link>
        </div>

        {/* Cart icon */}
        {/* <button className="cart-button">
          <img src="/shoe-box.png" alt="Cart" className="cart-icon" />
        </button> */}
        <Link to="/cart">
          <IconButton color="inherit" aria-label="cart">
            <Badge
              badgeContent={cart.reduce(
                (total, item) => total + item.quantity,
                0,
              )}
              color="error"
              showZero
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
      </nav>

      {/* Slide-in menu */}
      <div className={`side-menu ${menuOpen ? 'show' : ''}`}>
        <ul className="menu-items">
          <li onClick={closeMenu}>SNEAKERS</li>
          <li onClick={closeMenu}>SALE</li>
          <li onClick={closeMenu}>
            <Link to="/favorites"> FAVORITES </Link>
          </li>
          <li onClick={closeMenu}>
            <Link to="/login">SIGN IN</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
