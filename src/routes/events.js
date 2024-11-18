// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Events');

router.get('/', async (req, res) => {
    try {
        console.log('Fetching events from database...');
        const events = await Event.find();
        console.log('Events found:', events);
        res.json(events);
    } catch (err) {
        console.error('Error in events route:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;