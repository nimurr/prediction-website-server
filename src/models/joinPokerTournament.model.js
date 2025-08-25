const mongoose = require('mongoose');

const JoinPokerTournamentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // optional reference to your Users collection
    },
    pokertournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'PokerTournament', // optional reference to Poker Tournament collection
    },
    bitcoinAddress: {
        type: String,
        required: true,
    },
    pokernowUsername: {
        type: String,
        required: true,
    },
    bitcointalkUsername: {
        type: String,
        required: true,
    },
    casinoUsername: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    isWinner: {
        type: Boolean,
        default: false,
    },
    screenshotLink: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('JoinPokerTournament', JoinPokerTournamentSchema);
