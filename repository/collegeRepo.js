const mongoose = require('mongoose');
const CollegeModel = require('../model/CollegeModel');
const studentModel = require('../model/studentModel');
const FacultyModel = require('../model/facultyModel');

// ✅ Check whether a college exists
const isRegistered = async (collegeId) => {
    try {
        const college = await CollegeModel.findOne({ collegeId });
        return !!college;
    } catch (error) {
        console.error("Error checking college registration:", error);
        throw error;
    }
};

// ✅ Check whether a student exists
const isStudentExist = async (studentId) => {
    try {
        const student = await studentModel.findOne({ studentId });
        return !!student;
    } catch (error) {
        console.error("Error checking student existence:", error);
        throw error;
    }
};

// ✅ Check whether a faculty exists
const isFacultyExist = async (facultyId) => {
    try {
        const faculty = await FacultyModel.findOne({ facultyId });
        return !!faculty;
    } catch (error) {
        console.error("Error checking faculty existence:", error);
        throw error;
    }
};

// ✅ Register a college
const registerCollege = async (details) => {
    try {
        const isExist = await isRegistered(details.collegeId);
        if (isExist) {
            throw new Error("College already exists. Please proceed with login.");
        }

        const newCollege = await CollegeModel.create(details);
        return newCollege;
    } catch (error) {
        console.error("Error registering college:", error);
        throw error;
    }
};

// ✅ Register a student
const registerStudent = async (details) => {
    try {
        const isExist = await isStudentExist(details.studentId);
        if (isExist) {
            throw new Error("Student already exists. Please proceed with login.");
        }

        const newStudent = await studentModel.create(details);
        return newStudent;
    } catch (error) {
        console.error("Error registering student:", error);
        throw error;
    }
};

// ✅ Register a faculty
const registerFaculty = async (details) => {
    try {
        const isExist = await isFacultyExist(details.facultyId);
        if (isExist) {
            throw new Error("Faculty already exists. Please proceed with login.");
        }

        const newFaculty = await FacultyModel.create(details);
        return newFaculty;
    } catch (error) {
        console.error("Error registering faculty:", error);
        throw error;
    }
};

// ✅ Login a college and update token
const loginCollege = async (details) => {
    try {
        const { collegeId, token } = details;

        const college = await CollegeModel.findOneAndUpdate(
            { collegeId },
            { $set: { token } },
            { new: true }
        );

        if (!college) {
            throw new Error("College does not exist. Please register first.");
        }

        console.log("College login successful:", college.collegeId);
        return college;
    } catch (error) {
        console.error("Error logging in college:", error);
        throw error;
    }
};

// ✅ Find by collegeId
const findByCollegeId = async (collegeId) => {
    try {
        return await CollegeModel.findOne({ collegeId });
    } catch (error) {
        console.error("Error finding college by collegeId:", error);
        throw error;
    }
};

// ✅ Verify token in DB and check expiry
const verifyToken = async (collegeId, token) => {
    try {
        const college = await CollegeModel.findOne({
            collegeId,
            token,
            tokenExpireAt: { $gt: new Date() } // still valid
        });
        return college || null;
    } catch (error) {
        console.error("Error verifying token:", error);
        throw error;
    }
};

// ✅ Find by MongoDB _id
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
    findById,
    registerFaculty
};
