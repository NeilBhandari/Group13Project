// Project.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with detailed logging
mongoose.connect('mongodb://localhost:27017/project13', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connected successfully');
        // Log available collections
        mongoose.connection.db.listCollections().toArray((err, collections) => {
            if (err) {
                console.error('Error listing collections:', err);
            } else {
                console.log('Available collections:', collections.map(c => c.name));
            }
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);  // Exit if cannot connect to database
    });

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
});

// Routes
const userRoutes = require('./routes/users');
const tutoringRoutes = require('./routes/tutoring');
const eventRoutes = require('./routes/events');

app.use('/api/users', userRoutes);
app.use('/api/tutoring', tutoringRoutes);
app.use('/api/events', eventRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('- GET /api/users');
    console.log('- GET /api/tutoring');
    console.log('- GET /api/events');
});