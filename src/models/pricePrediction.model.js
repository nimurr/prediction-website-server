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
  predictedPrice: {
    type: Number,
    required: [true, "Predicted Price is required"],
    trim: true,
  },
  sponsorLink: {
    type: String,
    required: [true, "Sponsor link is required"],
    trim: true,
  },
  sponsorName: {
    type: String,
    required: [true, "Sponsor name is required"],
    trim: true,
  },
  predictionDeadline: {
    type: Date,
    required: [true, "Prediction deadline is required"],
  },
  applyPricePredictions: {
    type: [mongoose.Schema.Types.ObjectId], // array of predictions
    ref: 'SubmitPricePrediction',
    default: [],    // empty by default
  }
}, {
  timestamps: true // adds createdAt & updatedAt
});

module.exports = mongoose.model("PricePrediction", pricePredictionSchema);
