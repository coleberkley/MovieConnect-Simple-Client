// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:80/api/user/profile/', {
      withCredentials: true // Ensure credentials/cookies are included with the request
    })
    .then(response => {
      console.log("Profile data:", response.data);
      setUserData(response.data);
    })
    .catch((error) => {
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

  const handleLogout = () => {
    axios.post('http://localhost:80/api/user/logout/', {}, {
      withCredentials: true // Important for sending the HttpOnly cookie back to the server
    })
    .then(() => {
      navigate('/login'); // Redirect to login after successful logout
    })
    .catch((error) => {
      console.error("Logout error:", error.message);
      // Optionally handle logout errors specifically, for example, by showing a message to the user
    });
  };

  return (
    <div>
      <h2>Home</h2>
      {userData ? (
        <div>
          <p>Welcome, {userData.username}!</p>
          <button onClick={handleLogout}>Logout</button> {/* Logout Button */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Home;



