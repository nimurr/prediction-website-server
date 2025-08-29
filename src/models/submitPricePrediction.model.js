const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    pricePredictionId: {
        type: mongoose.Schema.Types.ObjectId, // assuming it references another collection
        required: true,
        ref: 'PricePrediction', // optional: reference collection name
    },
    bitcoinAddress: {
        type: String,
        required: true,
    },
    bitcointalkUsername: {
        type: String,
        required: true,
    },
    predictedPrice: {
        type: Number,
        required: true,
    },
    casinoUsername: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        match: [/.+@.+\..+/, 'Please enter a valid email address'], // basic email validation
    },
    isWinner: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('SubmitPricePrediction', PredictionSchema);
