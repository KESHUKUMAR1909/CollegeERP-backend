const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true
    },
    collegeErpId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    facultyId: {
        type: String,
        unique: true,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    totalSalary: {
        type: Number,
        required: true,
        min: 0
    },
    totalAttendance: {
        type: Number,
        default: 0,
        min: 0
    },
    currentAttendance: {
        type: Number,
        default: 0,
        min: 0,
        validate: {
            validator: function (v) {
                return v <= this.totalAttendance;
            },
            message: "Current attendance cannot exceed total attendance"
        }
    },
    role: {
        type: String,
        default: "Faculty"
    },
    password: {
        type: String,
        default: "12345678" // ⚠️ hash this before saving in production
    },

    // Added professional & personal details
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    phoneNumber: { 
        type: String, 
        trim: true 
    },
    designation: { 
        type: String, 
        default: "Lecturer" 
    },
    department: { 
        type: String, 
        required: true 
    },
    joiningDate: { 
        type: Date, 
        default: Date.now 
    }

}, { timestamps: true });

const FacultyModel = mongoose.model("Faculty", facultySchema);
module.exports = FacultyModel;
