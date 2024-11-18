// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    eventDetails: String,
    contactInfo: String
});

module.exports = mongoose.model('Event', eventSchema, 'Events'); // Explicitly point to 'Events' collection