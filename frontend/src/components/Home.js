import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// This is the main home page of the application
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status from localStorage on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);
  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to the Speech Recognition App</h1>
      <p>Convert speech to text with ease!</p>

      {!isLoggedIn ? (
        <>
          <Link to="/register" className="btn btn-primary m-2">Register</Link>
          <Link to="/login" className="btn btn-success m-2">Login</Link>
        </>
      ) : (
        <>
          <Link to="/upload" className="btn btn-success m-2">Get Started</Link>
          <button onClick={handleLogout} className="btn btn-danger m-2">Logout</button>
        </>
      )}
      <div className="mt-5">
        <h4 className="mb-4">Features</h4>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          
          <div className="col">
            <div className="card h-100 shadow-sm border-dark hover-effect bg-dark text-white">
              <div className="card-body text-center">
                <h5 className="card-title">Upload & Transcribe</h5>
                <p className="card-text">Upload audio and convert speech to text using AI.</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100 shadow-sm border-dark hover-effect bg-dark text-white">
              <div className="card-body text-center">
                <h5 className="card-title">Edit & Download</h5>
                <p className="card-text">Modify your transcriptions and download them instantly.</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100 shadow-sm border-dark hover-effect bg-dark text-white">
              <div className="card-body text-center">
                <h5 className="card-title">Live Text Animation</h5>
                <p className="card-text">Watch text appear with a smooth typing animation.</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100 shadow-sm border-dark hover-effect bg-dark text-white">
              <div className="card-body text-center">
                <h5 className="card-title"> Secure Access</h5>
                <p className="card-text">Register, log in, and protect your transcription data.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <style>
          {`
            .hover-effect {
              transition: transform 0.2s ease;
              cursor: pointer;
            }
            .hover-effect:hover {
              transform: scale(1.03);
            }
          `}
          </style>


    </div>

    
  
  
  );
};

export default Home;
