// Importing the Service Layer of College
const collegeService = require('../services/collegeService');


// Register College
const registerCollegeController = async (req, res) => {
    try {
        const details = req.body;
        console.log("📥 Received College Registration Request:", details);

        const college = await collegeService.registerCollegeService(details);

        if (!college) {
            return res.status(400).json({
                success: false,
                message: "College could not be registered. Please try again later."
            });
        }

        return res.status(201).json({
            success: true,
            message: "College registered successfully",
            data: college
        });

    } catch (error) {
        console.error("❌ Error in registerCollegeController:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};


// Register Student
const registerStudentController = async (req, res) => {
    try {
        const details = req.body;
        console.log("📥 Received Student Registration Request:", details);

        const student = await collegeService.registerStudentService(details);
        if (!student) {
            return res.status(400).json({
                success: false,
                message: "Student could not be registered. Please try again later."
            });
        }

        return res.status(201).json({
            success: true,
            message: "Student registered successfully",
            data: student
        });

    } catch (error) {
        console.error("❌ Error in registerStudentController:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};


// Login College
const loginCollegeController = async (req, res) => {
    try {
        const details = req.body;
        console.log("📥 Received College Login Request:", details);

        const collegeObject = await collegeService.loginCollegeService(details);
        if (!collegeObject.newCollege) {
            return res.status(400).json({
                success: false,
                message: "College could not be logged in. Please try again later."
            });
        }

        return res.status(200).json({
            success: true,
            message: "College logged in successfully",
            data: collegeObject
        });

    } catch (error) {
        console.error("❌ Error in loginCollegeController:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};


// Register Faculty
const registerFacultyController = async (req, res) => {
    try {
        const details = req.body;
        console.log("📥 Received Faculty Registration Request:", details);

        const faculty = await collegeService.registerfacultyService(details);
        if (!faculty) {
            return res.status(400).json({
                success: false,
                message: "Faculty could not be registered. Please try again later."
            });
        }

        return res.status(201).json({
            success: true,
            message: "Faculty registered successfully",
            data: faculty
        });

    } catch (error) {
        console.error("❌ Error in registerFacultyController:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};


module.exports = {
    registerCollegeController,
    registerStudentController,
    loginCollegeController,
    registerFacultyController
};
