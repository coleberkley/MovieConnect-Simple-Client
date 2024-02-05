// src/components/LogIn.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // When logging in, send a POST to <our future URL>/api/token/ to obtain a new token for that browser session
      // Sends username and password only when logging in to obtain a token for that user
      // The backend manually sets the token in the response cookies to be automatically put in the browser's HttpOnly cookies
      await axios.post('http://localhost:8000/api/token/', { username, password }, {
        withCredentials: true // Cookies will be blank in the request but filled in inside the response and automatically added to browser cookies
      });
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LogIn;

