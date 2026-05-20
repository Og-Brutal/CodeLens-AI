const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Code snippet is required']
    },
    language: {
        type: String,
        default: 'auto'
    },
    aiResponse: {
        score: Number,
        bugs: [String],
        security: [String],
        optimizations: [String],
        general_feedback: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
