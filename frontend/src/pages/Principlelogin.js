import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Img from '../Asset/Images/teacher.jpg';
import { API_URL } from '../util';  
import axios from 'axios';  
import axiosInstance from '../config/axiosInstance';

const LoginPage = () => {
  const [email, setEmail] = useState('principal@classroom.com');
  const [password, setPassword] = useState('Admin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      
      console.log('response ',response);
      console.log('token ',response?.data?.data?.token);



      const token = response?.data?.data?.token; 
      if (response.status === 200 && response.data.success) {
    localStorage.setItem('authToken', token);

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setSuccess('Login successful!');
        setError('');
        navigate('/principlesidebar');
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
        <img src={Img} alt="Teacher Profile" />
      </div>
      <div className="login-form">
        <h1>Welcome !</h1>
        <p>Log in as Principle.</p>
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
