const Timetable = require('../models/Timetable.model');
const Classroom = require('../models/Classroom.model');
const APIResponse = require('../utils/ApiResponse');

// Create a timetable for a classroom
const createTimetable = async (req, res) => {
    const { classroomId, subject, periods } = req.body;
    console.log('Create Timetable Request Body:', req.body);

    try {
        const classroom = await Classroom.findById(classroomId);

        if (!classroom) {
            return APIResponse.notFoundResponse(res, 'Classroom not found');
        }


        const timetable = new Timetable({ classroom: classroomId, subject, periods });
        const newTimetable = await timetable.save();
        console.log('New Timetable Created:', newTimetable);

        APIResponse.createdResponse(res, 'Timetable created successfully', newTimetable);
    } catch (error) {
        console.error('Create Timetable Error:', error); 
        APIResponse.errorResponse(res, error.message);
    }
};

module.exports = { createTimetable };
