const Classroom = require('../models/Classroom.model');
const User = require('../models/user.model');
const APIResponse = require('../utils/ApiResponse');

// Create a classroom
const createClassroom = async (req, res) => {
    const { name, startTime, endTime, days, teacherIds, studentIds } = req.body;
    console.log('Create Classroom Request Body:', req.body);

    try {
        const classroom = new Classroom({ name, startTime, endTime, days });

        if (teacherIds && teacherIds.length > 0) {
            const teacher = await User.findById(teacherIds[0]); // Assuming single teacher assignment
            if (teacher && teacher.role === 'Teacher') {
                classroom.teacher = teacher._id;
            } else {
                return APIResponse.validationErrorResponse(res, 'Invalid teacher ID');
            }
        }

        if (studentIds && studentIds.length > 0) {
            const students = await User.find({ _id: { $in: studentIds } });
            if (students.every(student => student.role === 'Student')) {
                classroom.students = students.map(student => student._id);
            } else {
                return APIResponse.validationErrorResponse(res, 'Invalid student IDs');
            }
        }

        const newClassroom = await classroom.save();
        console.log('New Classroom Created:', newClassroom);

        APIResponse.createdResponse(res, 'Classroom created successfully', newClassroom);
    } catch (error) {
        console.error('Create Classroom Error:', error); 
        APIResponse.errorResponse(res, error.message);
    }
};

// Assign teacher to a classroom
const assignTeacher = async (req, res) => {
    const { classroomId, teacherId } = req.body;
    console.log('Assign Teacher Request:', req.body);

    try {
        const classroom = await Classroom.findById(classroomId);
        const teacher = await User.findById(teacherId);

        if (!classroom) {
            return APIResponse.notFoundResponse(res, 'Classroom not found');
        }

        if (!teacher || teacher.role !== 'Teacher') {
            return APIResponse.validationErrorResponse(res, 'Invalid teacher ID');
        }

        classroom.teacher = teacherId;
        await classroom.save();
        console.log('Teacher Assigned:', teacher);

        APIResponse.successResponse(res, 'Teacher assigned successfully', classroom);
    } catch (error) {
        console.error('Assign Teacher Error:', error); 
        APIResponse.errorResponse(res, error.message);
    }
};

// Assign students to a classroom
const assignStudents = async (req, res) => {
    const { classroomId, studentIds } = req.body;
    console.log('Assign Students Request:', req.body);

    try {
        const classroom = await Classroom.findById(classroomId);
        const students = await User.find({ _id: { $in: studentIds } });

        if (!classroom) {
            return APIResponse.notFoundResponse(res, 'Classroom not found');
        }

        if (students.some(student => student.role !== 'Student')) {
            return APIResponse.validationErrorResponse(res, 'Invalid student IDs');
        }

        classroom.students = studentIds;
        await classroom.save();
        console.log('Students Assigned:', students);

        APIResponse.successResponse(res, 'Students assigned successfully', classroom);
    } catch (error) {
        console.error('Assign Students Error:', error); 
        APIResponse.errorResponse(res, error.message);
    }
};

// Get all classrooms
const getAllClassrooms = async (req, res) => {
    console.log('Get All Classrooms Request');

    try {
        const classrooms = await Classroom.find().populate('teacher students'); // Populate fields if needed
        console.log('All Classrooms:', classrooms);

        APIResponse.successResponse(res, 'Classrooms retrieved successfully', classrooms);
    } catch (error) {
        console.error('Get All Classrooms Error:', error); 
        APIResponse.errorResponse(res, 'Failed to retrieve classrooms');
    }
};

module.exports = { createClassroom, assignTeacher, assignStudents, getAllClassrooms };


