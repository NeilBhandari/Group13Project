// models/Tutoring.js
const mongoose = require('mongoose');

const tutoringSchema = new mongoose.Schema({
    name: String,
    email: String,
    details: String
});

module.exports = mongoose.model('Tutoring', tutoringSchema, 'Tutoring'); // Explicitly point to 'Tutoring' collection