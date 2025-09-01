const mongoose = require('mongoose');

const TakeReviewSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    casinoLink: {
        type: String,
        default: null
    },
    bonusTitle: {
        type: String,
        required: true
    },
    freeSpinsBonus: {
        type: String,
        required: false
    },
    lastUpdateDate: {
        type: Date,
        required: true
    },
    adminAvgRating: {
        type: Number,
        required: false,
        min: 0,
        max: 5
    },
    userAvgRating: {
        type: Number,
        required: false,
        min: 0,
        max: 5
    },
    summaryTitle: {
        type: String,
        required: true
    },
    allInfo: [
        {
            title: { type: String, required: true },
            subTitle: { type: String, required: true }
        }
    ],
    positivesSides: [
        { type: String }
    ],
    negativesSides: [
        { type: String }
    ],
    otherAllInfoTitleDescriptionImage: [
        {
            title: { type: String, required: true },
            ImageUrl: { type: String, required: true }
        }
    ],
    reviewedUsers: {
        // this is the array
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'TakeReview', required: true,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', TakeReviewSchema);
