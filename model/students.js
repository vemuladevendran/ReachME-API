'use strict'

const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    rollNumber: { type: String, required: true },
    examNumber: { type: String, required: true },
    year: { type: String, required: true },
    branch: { type: String, required: true },
    dob: { type: Date, required: true, trim: true, },
    mobileNumber: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    address: { type: String, required: true },
});

const Student = mongoose.model('Student', StudentSchema);


module.exports = Student;