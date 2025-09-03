const mongoose = require('mongoose');
const CollegeModel = require('../model/CollegeModel');

// Repository Function to check whether a college exists
const isRegistered = async (collegeId) => {
    try {
        const college = await CollegeModel.findOne({ collegeId });
        return !!college; // returns true if found, false otherwise
    } catch (error) {
        console.error("Error checking college registration:", error);
        throw error;
    }
};

// Repository Function to register the college
const registerCollege = async (details) => {
    try {
        const isExist = await isRegistered(details.collegeId);

        if (isExist) {
            throw new Error("College Already Exists. Please Proceed With Login.");
        }

        const newCollege = await CollegeModel.create(details);
        return newCollege;

    } catch (error) {
        console.error("Something went wrong while registering the college:", error);
        throw error; // rethrow so controller can handle response
    }
};

module.exports = {
    registerCollege,
    isRegistered   
};
