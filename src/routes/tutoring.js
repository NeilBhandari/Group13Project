// routes/tutoring.js
const express = require('express');
const router = express.Router();
const Tutoring = require('../models/Tutoring');

router.get('/', async (req, res) => {
    try {
        console.log('Fetching tutoring records from database...');
        const tutoring = await Tutoring.find();
        console.log('Tutoring records found:', tutoring);
        res.json(tutoring);
    } catch (err) {
        console.error('Error in tutoring route:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;