import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem('isLoggedIn', 'true'); // Set session
        navigate('/'); // Redirect to Home
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3>Login</h3>
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
      <button onClick={handleLogin} className="btn btn-success w-100">
        Login
      </button>

      <p className="mt-3">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>

      {message && (
        <div className="alert alert-info mt-3" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;
