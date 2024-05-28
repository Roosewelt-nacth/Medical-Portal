import { useState } from 'react';
import {  loginUser  } from '../backend/api';
// import crypto from 'crypto';
// import Home from './Home'; // Your home component
// import View from './Doctor View';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      setMessage(response.message);
      setUsername('');
      setPassword('');
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div>
      {/* Existing login form */}
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
