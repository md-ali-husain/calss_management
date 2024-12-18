import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Img from '../Asset/Images/teacher.jpg';
import axios from 'axios'; 
import { API_URL } from '../util'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });

      if (response.status === 200 && response.data.success) {
        setSuccess('Login successful!');
        setError('');
        navigate('/teachersidebar');
      } else {
        setError('Failed to log in. Please try again.');
        setSuccess('');
      }
    } catch (err) {
      setError('Failed to log in. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src={Img} alt="Profile" />
      </div>
      <div className="login-form">
        <h1>Welcome back!</h1>
        <p>Log in Teacher.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log in</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
