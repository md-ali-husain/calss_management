import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../../util';
import './ClassroomForm.css'; 

const AssignStudentForm = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClassroomsAndStudents = async () => {
            try {
                const [classroomsResponse, studentsResponse] = await Promise.all([
                    axios.get(`${API_URL}/api/classrooms/details`),
                    axios.get(`${API_URL}/api/auth/students`) 
                ]);
                setClassrooms(classroomsResponse.data.data);
                setStudents(studentsResponse.data.data);
            } catch (err) {
                setError('Failed to fetch data.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchClassroomsAndStudents();
    }, []);

    const formik = useFormik({
        initialValues: {
            classroomId: '',
            studentIds: [], 
        },
        validationSchema: Yup.object({
            classroomId: Yup.string().required('Classroom is required'),
            studentIds: Yup.array().min(1, 'At least one student must be selected').required('Students are required'),
        }),
        onSubmit: async (values) => {
            try {
                await axios.post(`${API_URL}/api/classrooms/assignstudents`, values);
                alert('Students assigned successfully');
                formik.resetForm();
            } catch (error) {
                console.error('Error assigning students:', error);
                alert('Failed to assign students');
            }
        },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const { studentIds } = formik.values;

        if (checked) {
            formik.setFieldValue('studentIds', [...studentIds, value]);
        } else {
            formik.setFieldValue('studentIds', studentIds.filter(id => id !== value));
        }
    };

    return (
        <div className="assign-student-form">
            <h1>Assign Students to Classroom</h1>
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
                    <label>Students</label>
                    <div className="student-list">
                        {students.map(student => (
                            <div key={student._id} className="student-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="studentIds"
                                        value={student._id}
                                        onChange={handleCheckboxChange}
                                        checked={formik.values.studentIds.includes(student._id)}
                                    />
                                    {student.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    {formik.touched.studentIds && formik.errors.studentIds ? (
                        <div className="error-message">{formik.errors.studentIds}</div>
                    ) : null}
                </div>

                <button type="submit" className="submit-button">Assign Students</button>
            </form>
        </div>
    );
};

export default AssignStudentForm;
