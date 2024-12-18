import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import moment from 'moment';
import { API_URL } from '../../util';
import './ClassroomForm.css';

const ClassroomForm = () => {
  const initialValues = {
    name: '',
    startTime: '',
    endTime: '',
    days: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Classroom name is required'),
    startTime: Yup.string().required('Start time is required'),
    endTime: Yup.string().required('End time is required'),
    days: Yup.array().min(1, 'Select at least one day').required('Days are required'),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const formattedValues = {
        ...values,
        startTime: moment(values.startTime, 'HH:mm').format('HH:mm'),
        endTime: moment(values.endTime, 'HH:mm').format('HH:mm'),
      };
      await axios.post(`${API_URL}/api/classrooms/create`, formattedValues);
      resetForm();
      alert('Classroom created successfully!');
    } catch (error) {
      console.error('Error creating classroom:', error);
      alert('Failed to create classroom.');
    }
  };

  return (
    <div className="classroom-form-container">
      <h1>Create Classroom</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="classroom-form">
            <div className="form-group">
              <label htmlFor="name">Classroom Name</label>
              <Field type="text" id="name" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="startTime">Start Time</label>
              <Field type="time" id="startTime" name="startTime" className="form-control" />
              <ErrorMessage name="startTime" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time</label>
              <Field type="time" id="endTime" name="endTime" className="form-control" />
              <ErrorMessage name="endTime" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Days</label>
              <div className="days-checkbox-group">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <label key={day}>
                    <Field
                      type="checkbox"
                      name="days"
                      value={day}
                      checked={values.days.includes(day)}
                      onChange={() => {
                        if (values.days.includes(day)) {
                          setFieldValue('days', values.days.filter(d => d !== day));
                        } else {
                          setFieldValue('days', [...values.days, day]);
                        }
                      }}
                    />
                    {day}
                  </label>
                ))}
              </div>
              <ErrorMessage name="days" component="div" className="error-message" />
            </div>

            <button type="submit" className="submit-button">Create Classroom</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ClassroomForm;
