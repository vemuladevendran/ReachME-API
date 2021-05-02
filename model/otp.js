'use strict'
const mongoose = require('mongoose');

const optSchema = new mongoose.Schema({
    otp: { type: String, require: true },
    userId: { type: String, require: true },
})

const otp = mongoose.model('otp', optSchema);

module.exports = otp;