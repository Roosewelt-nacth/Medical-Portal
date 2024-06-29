import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDoctor, getDoctors } from '../backend/api'; // Assuming the api file is correctly imported

function View() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [doctors, setDoctors] = useState([]); // Initialize as an empty array
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [schedule, setSchedule] = useState(new Date());
  const [fee, setFee] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]); // Ensure doctors is an empty array on error
      }
    };
    fetchDoctors();
  }, []);

  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoctor(name, description, location, schedule, fee);
      setName('');
      setDescription('');
      setLocation('');
      setSchedule(new Date());
      setFee('');
      setIsFormVisible(false);
      const response = await getDoctors();
      setDoctors(response);
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const handleScheduleChange = (date) => {
    setSchedule(date);
  };

  const setIsFormNotVisible = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Add Doctor</button>

      {isFormVisible && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: '' }}>
          <div style={{ background: 'black', padding: '20px', margin: '50px auto', width: '300px' }}>
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
                <DatePicker
                  selected={schedule}
                  onChange={handleScheduleChange}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
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
              <div>
                <button type="submit">Submit</button>
                <button type="button" onClick={setIsFormNotVisible}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h1>Doctor List</h1>
      <ul>
        {Array.isArray(doctors) && doctors.map((doctor) => (
          <li key={doctor._id}>
            <h2>{doctor.name}</h2>
            <p>Description: {doctor.description}</p>
            <p>Location: {doctor.location}</p>
            <p>Schedule: {new Date(doctor.schedule).toLocaleString()}</p>
            <p>Fee: ₹{doctor.fee}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default View;
