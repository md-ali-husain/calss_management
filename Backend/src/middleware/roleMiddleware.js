const APIResponse = require('../utils/ApiResponse');

const isPrincipal = (req, res, next) => {
    if (req.user.role !== 'Principal') {
        return APIResponse.unauthorizedResponse(res, 'Access denied. Not a principal.');
    }
    next();
};

const isTeacher = (req, res, next) => {
    if (req.user.role !== 'Teacher') {
        return APIResponse.unauthorizedResponse(res, 'Access denied. Not a teacher.');
    }
    next();
};

const isStudent = (req, res, next) => {
    if (req.user.role !== 'Student') {
        return APIResponse.unauthorizedResponse(res, 'Access denied. Not a student.');
    }
    next();
};

module.exports = { isPrincipal, isTeacher, isStudent };
