import { useState } from 'react';
import './Navbar.css';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import Grow from '@mui/material/Grow';

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

        <Link to="/cart">
          <IconButton style={{ color: 'black' }} aria-label="cart">
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
          {['SNEAKERS', 'SALE', 'FAVORITES', 'SIGN IN', 'PROFILE'].map(
            (item, index) => {
              let path = '';
              if (item === 'SIGN IN') {
                path = '/login';
              } else if (item === 'FAVORITES' || item === 'PROFILE') {
                path = `/${item.toLowerCase().replace(' ', '')}`;
              }

              return (
                <Grow
                  in={menuOpen}
                  timeout={1000 + index * 200}
                  key={item}
                  style={{ transformOrigin: '0 0 0' }}
                >
                  <li onClick={closeMenu}>
                    {path ? <Link to={path}>{item}</Link> : item}
                  </li>
                </Grow>
              );
            },
          )}
        </ul>
      </div>
    </>
  );
}
