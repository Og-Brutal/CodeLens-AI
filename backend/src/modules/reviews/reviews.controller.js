const reviewService = require('./reviews.service');

const createReview = async (req, res, next) => {
    try {
        const { code, language } = req.body;

        if (!code) {
            return res.status(400).json({ message: 'Code snippet is required' });
        }

        const reviewData = await reviewService.generateReview(code, language || 'auto');
        res.status(200).json(reviewData);
    } catch (error) {
        next(error);
    }
};

const getReviews = async (req, res, next) => {
    try {
        const reviews = await reviewService.getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createReview,
    getReviews
};
