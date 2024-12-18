const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const APIResponse = require('../utils/ApiResponse');

// Register a new user (Teacher or Student)
const register = async (req, res) => {
    const { email, password, name, role } = req.body;
    console.log('Register Request Body:', req.body);

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return APIResponse.unauthorizedResponse(res, 'Authorization header is missing or invalid');
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const loggedInUser = await User.findById(decoded.id);
        console.log('Logged In User:', loggedInUser);

        if (!loggedInUser) {
            return APIResponse.unauthorizedResponse(res, 'Logged in user not found');
        }

        if (loggedInUser.role === 'Principal') {
            if (role !== 'Teacher' && role !== 'Student') {
                return APIResponse.validationErrorResponse(res, 'Invalid role. Only Teacher or Student can be created');
            }
        } else if (loggedInUser.role === 'Teacher') {
            if (role !== 'Student') {
                return APIResponse.validationErrorResponse(res, 'Teachers can only register Students');
            }
        } else {
            return APIResponse.forbiddenResponse(res, 'Unauthorized role');
        }

        const existingUser = await User.findOne({ email });
        console.log('Existing User:', existingUser);

        if (existingUser) {
            return APIResponse.validationErrorResponse(res, 'User is already registered');
        }

        const user = await User.create({ email, password, name, role });
        console.log('New User Created:', user);

        APIResponse.createdResponse(res, 'User created successfully', user);
    } catch (error) {
        console.error('Registration Error:', error); 
        APIResponse.errorResponse(res, error.message);
    }
};

// Login a user
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login Request Body:', req.body);

    try {
        const user = await User.findOne({ email });
        console.log('User Found:', user);

        if (!user || !(await user.matchPassword(password))) {
            return APIResponse.validationErrorResponse(res, 'Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '48h'
        });
        console.log('Generated Token:', token);

        const data = {
            user: user,
            token: token,
            ipAddress: req.ip,
        };
        APIResponse.successResponse(res, 'User logged in successfully', data);
    } catch (error) {
        console.error("Login Error:", error); 
        APIResponse.errorResponse(res, error.message);
    }
};

// Logout a user
const logout = (req, res) => {
    try {
        APIResponse.successResponse(res, 'User logged out successfully');
    } catch (error) {
        console.error("Logout Error:", error); 
        APIResponse.errorResponse(res, error.message);
    }
};

// Update a user (Teacher or Student)
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password, name, role } = req.body;
    console.log('Update Request Body:', req.body);

    try {
        // Check if the logged-in user is authorized to update a user
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return APIResponse.unauthorizedResponse(res, 'Authorization header is missing or invalid');
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const loggedInUser = await User.findById(decoded.id);
        console.log('Logged In User:', loggedInUser);

        if (!loggedInUser) {
            return APIResponse.unauthorizedResponse(res, 'Logged in user not found');
        }

        if (loggedInUser.role === 'Principal' || (loggedInUser.role === 'Teacher' && role === 'Student')) {
            const userToUpdate = await User.findById(id);
            if (!userToUpdate) {
                return APIResponse.notFoundResponse(res, 'User not found');
            }

            if (email) userToUpdate.email = email;
            if (password) userToUpdate.password = password;
            if (name) userToUpdate.name = name;
            if (role) userToUpdate.role = role;
            const updatedUser = await userToUpdate.save();
            console.log('User Updated:', updatedUser);

            APIResponse.successResponse(res, 'User updated successfully', updatedUser);
        } else {
            return APIResponse.forbiddenResponse(res, 'Unauthorized to update this user');
        }
    } catch (error) {
        console.error('Update Error:', error); 
        APIResponse.errorResponse(res, error.message);
    }
};

// Delete a user (Teacher or Student)
const deleteUser = async (req, res) => {
    const { id } = req.params;
    console.log('Delete Request for User ID:', id);

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return APIResponse.unauthorizedResponse(res, 'Authorization header is missing or invalid');
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const loggedInUser = await User.findById(decoded.id);
        console.log('Logged In User:', loggedInUser);

        if (!loggedInUser) {
            return APIResponse.unauthorizedResponse(res, 'Logged in user not found');
        }

        // Ensure the logged-in user has the right role to delete the user
        const userToDelete = await User.findById(id);
        if (!userToDelete) {
            return APIResponse.notFoundResponse(res, 'User not found');
        }

        if (loggedInUser.role === 'Principal' || 
            (loggedInUser.role === 'Teacher' && userToDelete.role === 'Student')) {
            
            await User.findByIdAndDelete(id);
            console.log('User Deleted:', userToDelete);

            return APIResponse.successResponse(res, 'User deleted successfully');
        } else {
            return APIResponse.forbiddenResponse(res, 'Unauthorized to delete this user');
        }
    } catch (error) {
        console.error('Delete Error:', error); 
        return APIResponse.errorResponse(res, error.message);
    }
};

// Fetch all teachers
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'Teacher' });
        console.log('All Teachers:', teachers);
        APIResponse.successResponse(res, 'Teachers fetched successfully', teachers);
    } catch (error) {
        console.error('Get Teachers Error:', error); 
        APIResponse.errorResponse(res, error.message);
    }
};

// Fetch all students
const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'Student' });
        console.log('All Students:', students);
        APIResponse.successResponse(res, 'Students fetched successfully', students);
    } catch (error) {
        console.error('Get Students Error:', error); 
        APIResponse.errorResponse(res, error.message);
    }
};

module.exports = { register, login, logout, updateUser, deleteUser, getAllTeachers, getAllStudents };



