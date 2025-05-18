import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// This is the Navbar component that will be used across the application
const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  // Check Login status from LocalStorage
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Speech App</Link>

      <div className="ml-auto d-flex">
        {!isLoggedIn ? (
          <>
            <Link to="/register" className="btn btn-outline-primary mx-1">
              Register
            </Link>
            <Link to="/login" className="btn btn-outline-success mx-1">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/upload" className="btn btn-outline-secondary mx-1">
              Get Started
            </Link>
            <button onClick={handleLogout} className="btn btn-outline-danger mx-1">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

