const mongoose = require("mongoose");

const pricePredictionSchema = new mongoose.Schema({
  bitcoinImage: {
    type: String,
    required: [true, "Bitcoin image is required"],
  },
  bitcoinTitle: {
    type: String,
    required: [true, "Bitcoin title is required"],
    trim: true,
  },
  bitcoinSubtitle: {
    type: String,
    required: false, // optional
    trim: true,
  },
  joinLink: {
    type: String,
    required: [true, "Join link is required"],
    trim: true,
  },
  predictionDeadline: {
    type: Date,
    required: [true, "Prediction deadline is required"],
  },
  applyPricePredictions: {
    type: [String], // array of predictions
    default: [],    // empty by default
  }
}, {
  timestamps: true // adds createdAt & updatedAt
});

module.exports = mongoose.model("PricePrediction", pricePredictionSchema);
