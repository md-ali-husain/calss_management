const express = require('express');
const { createTimetable } = require('../controllers/timetableController');

const router = express.Router();

router.post('/create', createTimetable);

module.exports = router;
