const mongoose = require("mongoose");

const submitPredictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isWinner: {
    type: Boolean,
    default: false,
  },
  predictionId: { type: mongoose.Schema.Types.ObjectId, ref: "Prediction", required: true },
  bitcointalkUsername: { type: String, required: true },
  bitcoinAddress: { type: String, required: true },
  casinoUsername: { type: String, required: true },
  email: { type: String },
  selectTeam: { type: String, required: true },
  predictionSide: { type: String, enum: ["Yes", "No"], required: true },
  status: { type: String, enum: ["submitted", "pending", "completed"], default: "submitted" },
}, { timestamps: true });

const SubmitPrediction = mongoose.model("SubmitPrediction", submitPredictionSchema);

module.exports = SubmitPrediction;   // ✅ works in CommonJS