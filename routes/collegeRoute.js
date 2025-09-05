const express = require('express');
const { 
    registerCollegeController,  
    registerStudentController,  
    loginCollegeController,  
    registerFacultyController 
} = require('../controllers/collegeController');

const { collegeAuthMiddleware } = require('../middlewares/collegeMiddleware.js');
const router = express.Router();

// College registration & login
router.post('/register', registerCollegeController);
router.post('/login', loginCollegeController);

// Student registration (college must be authenticated)
router.post('/register/student', collegeAuthMiddleware, registerStudentController);

// Faculty registration (college must be authenticated)
router.post('/register/faculty', collegeAuthMiddleware, registerFacultyController);

module.exports = router;
