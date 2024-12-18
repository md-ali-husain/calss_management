import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../config/axiosInstance'; 
import { useLocation, useNavigate } from 'react-router-dom';
import './EditTeacherForm.css';

const EditStudentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedStudent } = location.state || {};

  const [student, setStudent] = useState(selectedStudent || null);
  const [loading, setLoading] = useState(!selectedStudent); 
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: student?.name || '',
      email: student?.email || '',
      role: student?.role || 'Student', 
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      role: Yup.string().required('Role is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axiosInstance.put(`/api/auth/users/${selectedStudent?._id}`, values); 
        navigate('/studentlist'); 
      } catch (error) {
        console.error('Error updating student:', error);
        setError(error.response?.data?.message || 'Failed to update student. Please try again later.');
      }
    },
  });

  useEffect(() => {
    if (!selectedStudent) {
      const fetchStudent = async () => {
        try {
          const response = await axiosInstance.get(`/api/auth/students/${selectedStudent?._id}`); 
          setStudent(response.data.data);
          formik.setValues({
            name: response.data.data.name,
            email: response.data.data.email,
            role: response.data.data.role,
          });
        } catch (err) {
          console.error('Error fetching student:', err);
          setError('Failed to fetch student data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchStudent();
    } else {
      setLoading(false); 
    }
  }, [ selectedStudent]);

  if (loading) {
    return <div className="edit-student-form-container">Loading...</div>;
  }
  return (
    <div className="edit-student-form-container">
      <h1>Edit Student</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={formik.touched.name && formik.errors.name ? 'input-error' : ''}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error-message">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
            className={formik.touched.role && formik.errors.role ? 'input-error' : ''}
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
          {formik.touched.role && formik.errors.role ? (
            <div className="error-message">{formik.errors.role}</div>
          ) : null}
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditStudentForm;
