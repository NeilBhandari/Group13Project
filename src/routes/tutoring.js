const express = require('express');
const router = express.Router();
const Tutoring = require('../models/Tutoring');

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0; // Get limit from query params
        const tutoring = await Tutoring.find().limit(limit);
        res.json(tutoring);
    } catch (err) {
        console.error('Error in tutoring route:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;