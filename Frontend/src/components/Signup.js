import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Changed state name to 'message'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage(''); // Reset message on each attempt

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5001/signup', {
        username,
        password
      });

      // Set success message
      setMessage('Signup successful! Please sign in.');

      // Redirect to signin page after success
      setTimeout(() => {
        navigate('/signin');
      }, 1500); // Redirect after a short delay to show success message
    } catch (err) {
      console.error('Signup Error:', err.response?.data || err.message);

      // Set error message
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>

      {/* Display Success or Error Message */}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
