import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const registerUser = async (username, password, email, phone, gender) => {
  try {
    const response = await api.post('/register', { username, password, email, phone, gender });
    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};

export const sendVerificationEmail = async (email, verificationKey) => {
  try {
    const response = await api.post('/sendVerificationEmail', { email, verificationKey });
    return response.data;
  } catch (error) {
    console.error("Error sending verification email", error);
    throw error;
  }
};

export const verifyEmail = async (email, verificationKey) => {
  try {
    const response = await api.post('/verifyEmail', { email, verificationKey });
    return response.data;
  } catch (error) {
    console.error("Error verifying email", error);
    throw error;
  }
};