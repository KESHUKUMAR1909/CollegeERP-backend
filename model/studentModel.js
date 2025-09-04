const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
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
    studentId: {
        type: String,
        unique: true,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    totalFee: { 
        type: Number,
        required: true
    },
    paidFee: {   
        type: Number,
        default: 0,
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
        min: 0
    },
    password: {
        type: String,
        default: "12345678"
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },  
    toObject: { virtuals: true }
});


studentSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


studentSchema.virtual("remainingFee").get(function () {
    return this.totalFee - this.paidFee;
});


studentSchema.virtual("attendancePercentage").get(function () {
    if (this.totalAttendance === 0) return 0;
    return parseFloat(((this.currentAttendance / this.totalAttendance) * 100).toFixed(2));
});

module.exports = mongoose.model("Student", studentSchema);
