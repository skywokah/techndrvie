import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth from AuthContext
import AvatarWithPopup from './AvatarWithPopup'; // Import AvatarWithPopup component
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Access authentication state and logout function

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Tech'n'drive</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
      <div className="navbar-icons">
        {/* <i className="fas fa-search" style={{ fontSize: '24px' }}></i> */}
        <Link to="/cart">
          <i className="fas fa-shopping-cart" style={{ fontSize: '24px' }}></i>
        </Link>
        {isAuthenticated ? (
          <>
            <AvatarWithPopup /> {/* Use AvatarWithPopup component */}
            <i
              className="fas fa-sign-out-alt"
              style={{ fontSize: '24px', cursor: 'pointer' }}
              onClick={logout}
              title="Logout"
            ></i>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <i className="fas fa-user-circle" style={{ fontSize: '24px' }}></i>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;