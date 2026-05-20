const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Import routes (will create these next)
const reviewsRoutes = require('./modules/reviews/reviews.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reviews', reviewsRoutes);

// Base route for health check
app.get('/', (req, res) => {
    res.json({ message: 'AI Code Reviewer API is running' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
