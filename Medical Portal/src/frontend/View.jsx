import React, { useState, useEffect } from 'react';
import axios from 'axios';

function View() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [schedule, setSchedule] = useState('');
  const [fee, setFee] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newDoctor = { name, description, location, schedule, fee };
    try {
      await axios.post('http://localhost:3000/add-doctor', newDoctor);
      fetchDoctors(); // Refresh the list of doctors
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
    setName('');
    setDescription('');
    setLocation('');
    setSchedule('');
    setFee('');
    setIsFormVisible(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Add Doctor</button>

      {isFormVisible && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: 'rgba(0, 0, 0, 0.5)' }}>
          <div style={{ background: 'white', padding: '20px', margin: '50px auto', width: '300px' }}>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Schedule:</label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Fee:</label>
                <input
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      <h1>Doctor List</h1>
      <ul>
        {doctors.map((doctor, index) => (
          <li key={index}>
            {doctor.name} - {doctor.description} - {doctor.location} - {doctor.schedule} - ₹{doctor.fee}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default View;
