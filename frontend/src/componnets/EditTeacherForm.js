import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../config/axiosInstance';
import './EditTeacherForm.css';

const EditTeacherForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { selectedTeacher } = location.state || {};

  const formik = useFormik({
    initialValues: {
      name: selectedTeacher?.name || '',
      email: selectedTeacher?.email || '',
      role: selectedTeacher?.role || 'Teacher',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      role: Yup.string().required('Role is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axiosInstance.put(`/api/auth/users/${selectedTeacher?._id}`, values);
        alert('update successfully!');
        navigate('/teacherlist');
      } catch (error) {
        console.error('Error updating teacher:', error);
      }
    },
  });

  return (
    <div className="edit-teacher-form-container">
      <h1>Edit Teacher</h1>
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
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
          {formik.touched.role && formik.errors.role ? (
            <div className="error-message">{formik.errors.role}</div>
          ) : null}
        </div>

        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  );
};

export default EditTeacherForm;
