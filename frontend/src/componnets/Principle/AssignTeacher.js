
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../../util';
import './ClassroomForm.css';


const AssignTeacherForm = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchClassroomsAndTeachers = async () => {
        try {
          const [classroomsResponse, teachersResponse] = await Promise.all([
            axios.get(`${API_URL}/api/classrooms/details`), 
            axios.get(`${API_URL}/api/auth/teachers`) 
          ]);
          setClassrooms(classroomsResponse.data.data);
          setTeachers(teachersResponse.data.data);
        } catch (err) {
          setError('Failed to fetch data.');
          console.error('Error fetching data:', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchClassroomsAndTeachers();
    }, []);
  
    const formik = useFormik({
      initialValues: {
        classroomId: '',
        teacherId: '',
      },
      validationSchema: Yup.object({
        classroomId: Yup.string().required('Classroom ID is required'),
        teacherId: Yup.string().required('Teacher ID is required'),
      }),
      onSubmit: async (values) => {
        try {
          await axios.post(`${API_URL}/api/classrooms/assignteacher`, values);
          alert('Teacher assigned successfully');
          formik.resetForm();
        } catch (error) {
          console.error('Error assigning teacher:', error);
          alert('Failed to assign teacher');
        }
      },
    });
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <div className="assign-teacher-form">
        <h1>Assign Teacher to Classroom</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="classroomId">Classroom</label>
            <select
              id="classroomId"
              name="classroomId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.classroomId}
              className={formik.touched.classroomId && formik.errors.classroomId ? 'input-error' : ''}
            >
              <option value="">Select Classroom</option>
              {classrooms.map(classroom => (
                <option key={classroom._id} value={classroom._id}>
                  {classroom.name}
                </option>
              ))}
            </select>
            {formik.touched.classroomId && formik.errors.classroomId ? (
              <div className="error-message">{formik.errors.classroomId}</div>
            ) : null}
          </div>
  
          <div className="form-group">
            <label htmlFor="teacherId">Teacher</label>
            <select
              id="teacherId"
              name="teacherId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.teacherId}
              className={formik.touched.teacherId && formik.errors.teacherId ? 'input-error' : ''}
            >
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
            {formik.touched.teacherId && formik.errors.teacherId ? (
              <div className="error-message">{formik.errors.teacherId}</div>
            ) : null}
          </div>
  
          <button type="submit" className="submit-button">Assign Teacher</button>
        </form>
      </div>
    );
  };
  
  export default AssignTeacherForm;