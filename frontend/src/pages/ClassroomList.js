import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../util';
import './ClassroomList.css'; 

const ClassroomListPage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/classrooms/details`);
        console.log('Fetched classrooms:', response.data);
        if (Array.isArray(response.data.data)) {
          setClassrooms(response.data.data);
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (err) {
        setError('Failed to fetch classrooms.');
        console.error('Error fetching classrooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="classroom-list">
      <h1>Classroom List</h1>
      <div className="classroom-cards">
        {classrooms.map(classroom => (
          <div key={classroom._id} className="classroom-card">
            <h2>{classroom.name || 'No Name Available'}</h2>
            <p><strong>Teacher:</strong> {classroom.teacher?.name || 'No Teacher Assigned'}</p>
            <p><strong>Students:</strong> {classroom.students?.length || 0}</p>
            <p><strong>days:</strong> {classroom.days || 0}</p>
            <p><strong>startTime:</strong> {classroom.startTime || 0}</p>
            <p><strong>endTime:</strong> {classroom.endTime || 0}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassroomListPage;
