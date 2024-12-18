const express = require('express');
const { createClassroom, assignTeacher, assignStudents,getAllClassrooms } = require('../controllers/classroomController');

const router = express.Router();

router.post('/create', createClassroom);
router.post('/assignteacher', assignTeacher);
router.post('/assignstudents', assignStudents);
// Get all classrooms
router.get('/details', getAllClassrooms);

module.exports = router;
