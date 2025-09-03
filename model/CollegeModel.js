const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide College name"],
        trim: true
    },

    collegeId: {
        type: String,
        required: [true, "Please Provide College Id"],
        unique: true
    },

    courses: [
        {
            courseName: { type: String, required: true },
            timePeriod: { type: String, required: true }
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
    }
}, { timestamps: true });

const CollegeModel = mongoose.model('College', collegeSchema);
module.exports = CollegeModel;
