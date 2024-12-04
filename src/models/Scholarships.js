// models/Scholarship.js
const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
    details: { type: String, required: true },
    eligibility: { type: String, required: true },
    deadline: { type: String, required: true }
});

module.exports = mongoose.model('Scholarship', scholarshipSchema, 'Scholarships'); // Explicitly point to 'Scholarships' collection
