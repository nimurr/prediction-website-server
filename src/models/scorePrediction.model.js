const mongoose = require('mongoose');

const scorePredictionSchema = new mongoose.Schema({
    sportImage: {
        type: String,
        required: [true, "Sport Image is required"], // ✅ fixed
    },

    sportTitle: {
        type: String,
        required: [true, "Sport title is required"], // ✅ fixed
        trim: true,
    },
    sportDescription: {
        type: String,
        required: false, // ✅ optional, no need for message
        trim: true,
    },
    firstTeamName: {
        type: String,
        required: [true, "First team name is required"], // ✅ fixed
        trim: true,
    },
    secondTeamName: {
        type: String,
        required: [true, "Second team name is required"], // ✅ fixed
        trim: true,
    },
    sponsorName: {
        type: String,
        required: [true, "Sponsor name is required"], // ✅ fixed
        trim: true,
    },
    sponsorLink: {
        type: String,
        required: [true, "Sponsor link is required"], // ✅ fixed
        trim: true,
    },
    predictionDeadline: {
        type: Date,
        required: [true, "Prediction deadline is required"], // ✅ fixed
    },
    applyAllPredictions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'SubmitPrediction',
        default: [], // ✅ must be an empty array
    }
}, {
    timestamps: true // adds createdAt & updatedAt
});

module.exports = mongoose.model('ScorePrediction', scorePredictionSchema);
