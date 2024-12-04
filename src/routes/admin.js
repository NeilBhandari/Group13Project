const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Job = require('../models/Jobs');
const Scholarship = require('../models/Scholarships');
const Tutoring = require('../models/Tutoring');

// Middleware to ensure the user is an admin
const ensureAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId); // Expecting userId in the request body
        if (user && user.accessLevel === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Access denied: Admins only' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error while checking admin status' });
    }
};

// Add a new job
router.post('/jobs', ensureAdmin, async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json({ message: 'Job added successfully', job: newJob });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new scholarship
router.post('/scholarships', ensureAdmin, async (req, res) => {
    try {
        const newScholarship = new Scholarship(req.body);
        await newScholarship.save();
        res.status(201).json({ message: 'Scholarship added successfully', scholarship: newScholarship });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new tutoring record
router.post('/tutoring', ensureAdmin, async (req, res) => {
    try {
        const newTutoring = new Tutoring(req.body);
        await newTutoring.save();
        res.status(201).json({ message: 'Tutoring record added successfully', tutoring: newTutoring });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
