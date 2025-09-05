const mongoose = require('mongoose');

const TakeReviewSchema = new mongoose.Schema({
    image: {
        type: String,
        default: null
    },
    casinoLink: {
        type: String,
        default: null
    },
    bonusTitle: {
        type: String,
        default: null
    },
    freeSpinsBonus: {
        type: String,
        required: false,
        default: null
    },
    lastUpdateDate: {
        type: Date,
        default: null
    },
    adminAvgRating: {
        type: Number,
        required: false,
        default: null,
        min: 0,
        max: 5
    },
    userAvgRating: {
        type: Number,
        required: false,
        min: 0,
        max: 5,
        default: null
    },
    summaryTitle: {
        type: String,
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
            description: { type: String, },
            image: { type: String, }
        }
    ],
    reviewedUsers: {
        // this is the array
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'TakeReview',
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', TakeReviewSchema);
