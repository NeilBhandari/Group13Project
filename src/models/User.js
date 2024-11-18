// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    accessLevel: String,
    password: String,
});

module.exports = mongoose.model('User', userSchema, 'User'); // Explicitly point to 'User' collection