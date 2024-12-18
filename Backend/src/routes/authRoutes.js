const express = require('express');
const {
    register,
    login,
    logout,
    updateUser,
    deleteUser,
    getAllTeachers,
    getAllStudents
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

router.get('/teachers', getAllTeachers);

router.get('/students', getAllStudents);

module.exports = router;
