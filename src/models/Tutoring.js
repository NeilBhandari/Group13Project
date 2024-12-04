// models/Tutoring.js
const mongoose = require('mongoose');

const tutoringSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    details: { type: String, required: true }
});

module.exports = mongoose.model('Tutoring', tutoringSchema, 'Tutoring'); // Explicitly point to 'Tutoring' collection
