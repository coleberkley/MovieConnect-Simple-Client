// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching user profile");
    axios.get('http://localhost:8000/api/user/profile/', {
      withCredentials: true // Ensure credentials/cookies are included with the request
    })
    .then(response => {
      console.log("Profile data:", response.data);
      setUserData(response.data);
    })
    .catch((error) => {
      // Improved error handling
      if (error.response) {
        console.error("Profile fetch error:", error.response.data);
      } else if (error.request) {
        console.error("Profile fetch error: No response received", error.request);
      } else {
        console.error("Profile fetch error:", error.message);
      }
      navigate('/login'); // Redirect to login if not authenticated or other error occurs
    });
  }, [navigate]);

  return (
    <div>
      <h2>Home</h2>
      {userData ? (
        <div>
          <p>Welcome, {userData.username}!</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Home;


