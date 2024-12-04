// models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    employer: { type: String, required: true },
    contact: { type: String, required: true },
    deadline: { type: String, required: true }
});

module.exports = mongoose.model('Job', jobSchema, 'Jobs'); // Explicitly point to 'Jobs' collection
