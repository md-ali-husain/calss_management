import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../config/axiosInstance';
import { API_URL } from '../util';
import './style.css';

const CreateTeacherForm = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
            name: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                await axiosInstance.post(`${API_URL}/api/auth/register`, { ...values, role: 'Teacher' }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                alert('Teacher registered successfully!');
               
            } catch (error) {
                console.error('Registration Error:', error);
                setErrors({ api: error.response?.data?.message || 'Failed to register' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="create-form-container">
            <h1>Create Teacher</h1>
            <div className="form-container">
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? <div className="error-message">{formik.errors.email}</div> : null}
                    
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? <div className="error-message">{formik.errors.password}</div> : null}

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? <div className="error-message">{formik.errors.name}</div> : null}

                    {formik.errors.api ? <div className="error-message">{formik.errors.api}</div> : null}
                    
                    <button type="submit" disabled={formik.isSubmitting}>Register Teacher</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTeacherForm;
