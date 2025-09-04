const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide College name"],
        trim: true
    },
    email: {
        type: String,
        required: true,
    },
    collegeId: {
        type: String,
        required: [true, "Please Provide College Id"],
        unique: true
    },

    courses: [
        {
            courseName: { type: String, required: true },
            timePeriod: { type: String, required: true },
            courseId: { type: String, required: true, unique: true }
        }
    ],

    uniqueErpId: {
        type: String,
        unique: true
    },

    websiteUrl: {
        type: String
    },

    contactNumber: {
        type: String
    },
    token: {
        type: String,
        default: null
    },
    tokenExpireAt: {
        type: Date,
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
    }


}, { timestamps: true });

const CollegeModel = mongoose.model('College', collegeSchema);
module.exports = CollegeModel;
