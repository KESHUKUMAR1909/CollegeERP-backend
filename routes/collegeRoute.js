const express = require('express');
const { registerCollegeController } = require('../controllers/collegeController');
const router = express.Router();

// Route to register a college
router.post('/register', registerCollegeController);

module.exports = router;
