const collegeRepository = require('../repository/collegeRepo');
const ShortUniqueId = require('short-unique-id');
const { hashFunc } = require('../utils/bcryptFun'); // your bcrypt wrapper
require('dotenv').config();
const { sendMail } = require('../utils/sendMail');    // your email sender
const jwt = require('jsonwebtoken');

const registerCollegeService = async (details) => {
    try {
        // 1. Generate unique 6-digit ERP ID
        const uid = new ShortUniqueId({ length: 6 });
        const plainErpId = uid.rnd();

        // 2. Send plain ID via email
        await sendMail(details.email, plainErpId);

        // 3. Hash the ERP ID before saving
        const hashedErpId = await hashFunc(plainErpId);

        // 4. Attach hashed ERP ID to college details
        details.uniqueErpId = hashedErpId;

        // 5. Save in DB through repository
        const newCollege = await collegeRepository.registerCollege(details);

        return newCollege;
    } catch (error) {
        console.error("Error in registerCollegeService:", error.message);
        throw error;
    }
};

const registerStudentService = async (details) => {
    try {
        const newStudent = await collegeRepository.registerStudent(details);
        return newStudent;
    } catch (error) {
        console.error("Error in registerStudentService:", error.message);
        throw error;
    }
};

const loginCollegeService = async (details) => {
    try {
        const secretKey = process.env.secret;

        // Only put required fields inside the token payload
        const payload = {
            uniqueErpId: details.uniqueErpId,
            collegeId: details.collegeId,
            name: details.name,
            email: details.email
        };

        // Generate JWT (expires in 1h)
        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
        console.log("Generated JWT for college:", token);

        // Hash the token before saving in DB
        const hashedToken = await hashFunc(token);
        details.token = hashedToken;
        details.tokenExpireAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Save college login session
        const newCollege = await collegeRepository.loginCollege(details);

        return { token, newCollege };
    } catch (error) {
        console.error("Error in loginCollegeService:", error.message);
        throw error;
    }
};

const registerfacultyService = async (details) => {
    try {
        const newFaculty = await collegeRepository.registerFaculty(details);
        return newFaculty;
    } catch (error) {
        console.error("Error in registerFacultyService:", error.message);
        throw error;
    }
};

module.exports = {
    registerCollegeService,
    registerStudentService,
    loginCollegeService,
    registerfacultyService
};
