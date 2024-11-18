const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        console.log('Fetching users from database...');
        const users = await User.find();
        console.log('Users found:', users);
        res.json(users);
    } catch (err) {
        console.error('Error in users route:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
