const mongoose = require("mongoose");

const pokerTournamentSchema = new mongoose.Schema({
  uploadPokerTournamentImage: {
    type: String,
    required: [true, "Poker tournament image is required"],
  },

  pokerTournamentTitle: {
    type: String,
    required: [true, "Poker tournament title is required"],
    trim: true,
  },
  buyIn: {
    type: Number,
    required: [true, "Buy-in amount is required"],
  },
  time: {
    type: Date,
    required: [true, "Tournament time is required"],
  },
  type: {
    type: String,
    required: [true, "Tournament type is required"],
    trim: true,
  },
  maxPlayers: {
    type: Number,
    required: [true, "Maximum players is required"],
  },
  sponsor: {
    type: String,
    required: false, // optional
    trim: true,
  },
  rewards: {
    type: String,
    required: false, // optional
    trim: true,
  },
  joinLink: {
    type: String,
    required: [true, "Join link is required"],
    trim: true,
  },
  applyPokerTournamentUsers: {
    type: [mongoose.Schema.Types.ObjectId], // list of user IDs
    ref: 'JoinPokerTournament',
    default: [],    // empty array by default
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("PokerTournament", pokerTournamentSchema);
