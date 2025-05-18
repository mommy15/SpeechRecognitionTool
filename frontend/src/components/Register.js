import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// This is the registration component for new users
const Register = () => {
  // State variables for email, password, and message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  // Handle registration
  // This function sends a POST request to the backend to register a new user
  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/register', {
        email,
        password,
      });
      setMessage(res.data.message); // Show success message
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Registration failed.'); // Show error message
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3>Register</h3>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="form-control my-2"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="form-control my-2"
      />
      <button onClick={handleRegister} className="btn btn-primary w-100">
        Register
      </button>

      <p className="mt-3">
        Already have an account? <Link to="/">Login here</Link>
      </p>

      {message && (
        <div className="alert alert-info mt-3" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default Register;
