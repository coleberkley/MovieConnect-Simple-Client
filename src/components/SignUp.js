// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Since signing up a user routes a user to LogIn, it only checks with the backend if a
      // user can be created and if it can, it creates the user in the database but doesn't log the user in.
      // When you log in, that's when you request a web token 
        await axios.post('http://localhost:8000/api/user/signup/', { username, password }, {
            withCredentials: true // Will be blank for sign up page but good to always include cookies whether signed in or not for consistency
        });
        navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
        if (error.response && error.response.data) {
            // Handle case where backend validation errors exist
            console.error('Signup failed:', error.response.data);
        } else {
            // Handle case where error response might not be structured as expected
            console.error('Signup failed:', error.message);
        }
    }
};


  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

