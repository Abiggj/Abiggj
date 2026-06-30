import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaProjectDiagram, FaBlog, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Logout from './Logout';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src="/logo.svg" alt="Logo" className="logo-img" />
          <div className="logo-text-group">
            <span className="logo-text">Aniket Jhariya</span>
            <span className="logo-subtitle">DevOps Engineer</span>
          </div>
        </Link>
        
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUser className="nav-icon" />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/projects" 
              className={location.pathname === '/projects' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaProjectDiagram className="nav-icon" />
              <span>Projects</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/blog" 
              className={location.pathname.includes('/blog') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaBlog className="nav-icon" />
              <span>Blog</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={location.pathname === '/contact' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaEnvelope className="nav-icon" />
              <span>Contact</span>
            </Link>
          </li>
          {isAuthenticated() && (
            <>
              {isAdmin() && (
                <li>
                  <Link
                    to="/admin"
                    className={location.pathname === '/admin' ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Admin</span>
                  </Link>
                </li>
              )}
              <li>
                <Logout />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
