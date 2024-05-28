import { useState } from 'react';
import {  loginUser , verifyEmail } from './api';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false); 
  const [verificationKey, setVerificationKey] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      // Implement verifyEmail function in api.js
      const response = await verifyEmail(email, verificationCode); 
      setMessage(response.message);
      setRegistrationSuccess(false);
      // Clear verification code after successful verification
      setVerificationCode('');
    } catch (error) {
      setMessage('Email verification failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Generate a random verification key
      const key = generateVerificationKey();
      setVerificationKey(key);
      // Send verification email with the generated key
      await sendVerificationEmail(email, key);
      setIsVerificationSent(true);
    } catch (error) {
      setMessage('Failed to send verification email');
    }
  };

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

  // Function to generate a random verification key
  const generateVerificationKey = () => {
    // Implementation to generate a random key
    // For example, you can use a library like 'uuid' or generate a random string
    return 'random_verification_key'; // Replace with actual implementation
  };

  // Function to send verification email
  const sendVerificationEmail = async (email, key) => {
    // Implement sending email using an email service
    // For example, you can use a library like 'nodemailer'
    // Here, we simulate sending email by logging to console
    console.log(`Verification email sent to ${email} with key: ${key}`);
  };

  return (
    <div>
      {registrationSuccess ? (
        <div>
          <h1>Verify Email</h1>
          <form onSubmit={handleVerification}>
            {/* Input for verification code */}
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button type="submit">Verify</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            {/* Registration form */}
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
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === "other"}
                  onChange={(e) => setGender(e.target.value)}
                />Other
              </label>
            </div>
            <button type="submit">Register</button>
          </form>
          {isVerificationSent && <p>Verification email sent to {email}</p>}
        </div>
      )}

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

export default App;
