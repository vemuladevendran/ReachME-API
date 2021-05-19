'use strict'

const mongoose = require('mongoose');
const ReportsSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    rollNumber: { type: String, required: true },
    email: { type: String, required: true },
    repoterName: { type: String, required: true },
    reportTitle: { type: String, required: true },
    reportDate: { type: String, required: true },
    reportContent: { type: String, required: true },
});

const Reports = mongoose.model('Reports', ReportsSchema);


module.exports = Reports;