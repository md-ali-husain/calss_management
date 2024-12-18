const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    periods: [{
        day: {
            type: String, 
            required: true
        },
        startTime: {
            type: String, 
            required: true
        },
        endTime: {
            type: String, 
            required: true
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);
