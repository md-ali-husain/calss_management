
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const APIResponse = require('../utils/ApiResponse');

const protect = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return APIResponse.unauthorizedResponse(res, 'Access denied. No token provided.');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const user = await User.findById(decoded.id);

        if (!user) {
            return APIResponse.unauthorizedResponse(res, 'Invalid token.');
        }

        req.user = user; 
        next();
    } catch (error) {
        APIResponse.unauthorizedResponse(res, 'Invalid token.');
    }
};

module.exports = { protect };




