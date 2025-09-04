const mongoose = require('mongoose');
const CollegeModel = require('../model/CollegeModel');
const studentModel = require('../model/studentModel');

// Check whether a college exists
const isRegistered = async (collegeId) => {
    try {
        const college = await CollegeModel.findOne({ collegeId });
        return !!college;
    } catch (error) {
        console.error("Error checking college registration:", error);
        throw error;
    }
};

// Check whether a student exists
const isStudentExist = async (studentId) => {
    try {
        const student = await studentModel.findOne({ studentId });
        return !!student;
    } catch (error) {
        console.error("Error checking Student registration:", error);
        throw error;
    }
};

// Register a college
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
        throw error;
    }
};

// Register a student
const registerStudent = async (details) => {
    try {
        const isExist = await isStudentExist(details.studentId);

        if (isExist) {
            throw new Error("Student Already Exists. Please Proceed With Login.");
        }

        const newStudent = await studentModel.create(details);
        return newStudent;
    } catch (error) {
        console.error("Something went wrong while registering the student:", error);
        throw error;
    }
};

// Login a college and update token
const loginCollege = async (details) => {
    try {
        const { collegeId, token } = details; // ✅ include token

        const college = await CollegeModel.findOneAndUpdate(
            { collegeId },                    // search by collegeId
            { $set: { token } },              // update the token
            { new: true }                     // return the updated document
        );

        if (!college) {
            throw new Error("College does not exist. Please register first.");
        }

        console.log("College logged in successfully:", college);
        return college;
    } catch (error) {
        console.error("Something went wrong while logging in the college:", error);
        throw error;
    }
};


// Find by collegeId + token
const findByCollegeId= async (collegeId, token) => {
    return await CollegeModel.findOne({
        collegeId
    });
};

// ✅ Verify token in DB and check expiry
const verifyToken = async (collegeId, token) => {
    try {
        const college = await CollegeModel.findOne({
            collegeId,
            token,
            tokenExpireAt: { $gt: new Date() } // still valid
        });
        return college || null; // return null if not found or expired
    } catch (error) {
        console.error("Error verifying token:", error);
        throw error;
    }
};

// Find by MongoDB _id
const findById = async (id) => {
    try {
        return await CollegeModel.findById(id);
    } catch (error) {
        console.error("Error finding college by ID:", error);
        throw error;
    }
};

module.exports = {
    registerCollege,
    isRegistered,
    registerStudent,
    loginCollege,
    findByCollegeId,
    verifyToken,
    findById
};
