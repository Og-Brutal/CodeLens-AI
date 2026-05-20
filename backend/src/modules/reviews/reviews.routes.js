const express = require('express');
const router = express.Router();
const reviewController = require('./reviews.controller');

// @route   POST /api/reviews
// @desc    Submit code for AI review
// @access  Public
router.post('/', reviewController.createReview);

// @route   GET /api/reviews
// @desc    Get all past reviews
// @access  Public
router.get('/', reviewController.getReviews);

module.exports = router;
