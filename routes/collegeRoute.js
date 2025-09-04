const express = require('express');
const { registerCollegeController  , registerStudentController  , loginCollegeController} = require('../controllers/collegeController');
const {collegeAuthMiddleware} = require('../middlewares/collegeMiddleware.js');
const router = express.Router();

// Route to register a college
router.post('/register', registerCollegeController);
router.post('/login' , loginCollegeController);


router.post('/register/student' ,collegeAuthMiddleware , registerStudentController);

module.exports = router;
