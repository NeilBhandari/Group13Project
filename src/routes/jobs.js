const express = require('express');
const router = express.Router();
const Job = require('../models/Jobs');

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0; // Get limit from query params
        const jobs = await Job.find().limit(limit);
        res.json(jobs);
    } catch (err) {
        console.error('Error in jobs route:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;