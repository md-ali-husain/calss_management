const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    startTime: {
        type: String,
        required: true 
    },
    endTime: {
        type: String,
        required: true 
    },
    days: {
        type: [String], 
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: false
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }]
}, { timestamps: true });

module.exports = mongoose.model('Classroom', classroomSchema);
