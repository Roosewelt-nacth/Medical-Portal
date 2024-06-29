import axios from 'axios';


const API_BASE_URL = 'http://localhost:5000/api';
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

export const adddoctor = async (name, description, location, schedule, fee)=>{
  try{
    const response=await api.post('/add-doctor',{name, description, location, schedule, fee});
    return response.data;
  }catch(error){
    console.error("error adding doctor",error);
    throw error;
  }
}

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

const fetchDoctors = async () => {
  try {
    const response = await api.get('http://localhost:5000/api/doctors');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
};

// export const getDoctors = async () => {
//   try{
//     const response = await api.get('/api/doctors');
//     const data=response.json();
//     return data;
//   }catch(error){
//     console.error("error occured",error);
//     throw error;
//   }
// }

export const addDoctor = async (name, description, location, schedule, fee) => {
  const response = await axios.post(`${API_BASE_URL}/add-doctor`, {
    name,
    description,
    location,
    schedule,
    fee,
  });
  return response.data;
};

export const getDoctors = async () => {
  const response = await axios.get(`${API_BASE_URL}/doctors`);
  if (response.data && Array.isArray(response.data)) {
    return response.data;
  }
  return [];
};