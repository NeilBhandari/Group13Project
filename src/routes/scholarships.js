// routes/scholarships.js
const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarships');

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0; // Get limit from query params
        const scholarships = await Scholarship.find().limit(limit);
        res.json(scholarships);
    } catch (err) {
        console.error('Error in scholarships route:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;