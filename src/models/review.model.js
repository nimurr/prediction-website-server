const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    bonusTitle: {
        type: String,
        required: true,
    },
    freeSpinsBonus: {
        type: String,
        required: true,
    },
    lastUpdateDate: {
        type: Date,
        required: true,
    },
    adminAvgRating: {
        type: Number,
        required: true,
    },
    userAvgRating: {
        type: Number,
        required: true,
    },
    summaryTitle: {
        type: String,
        required: true,
    },
    allInfo: {
        type: [String],
        default: [],
        required: true,
    },
    positivesSides: {
        type: [String],
        default: [],
    },
    negativesSides: {
        type: [String],
        default: [],
    },
    otherAllInfoTitleDescriptionImage: {
        type: [String],
        default: [],
    }

}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
