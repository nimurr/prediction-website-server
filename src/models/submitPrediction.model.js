const mongoose = require("mongoose");

const submitPredictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isWinner: {
    type: Boolean,
    default: false,
  },
  predictionId: { type: mongoose.Schema.Types.ObjectId, ref: "ScorePrediction", required: true },
  bitcointalkUsername: { type: String, required: true },
  predictionTime: { type: String, required: true },
  bitcoinAddress: { type: String, required: true },
  casinoUsername: { type: String, required: true },
  email: { type: String },
  predictionSide1: { type: String, required: true },
  predictionSide2: { type: String, required: true },
  status: { type: String, enum: ["submitted", "pending", "completed"], default: "submitted" },
}, { timestamps: true });

const SubmitPrediction = mongoose.model("SubmitPrediction", submitPredictionSchema);

module.exports = SubmitPrediction;   // ✅ works in CommonJS