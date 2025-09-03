// Importing the Service Layer of College
const collegeService = require('../services/collegeService');

const registerCollegeController = async (req, res) => {
    try {
        const details = req.body;
        console.log("Received College Registration Request:", details);

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
        console.error("Error in registerCollegeController:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

module.exports = {
    registerCollegeController
};
