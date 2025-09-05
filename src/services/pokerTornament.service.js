const { PokerTournament, JoinPokerTournament } = require("../models");

const createPokerTornament = async ({ ...data }) => {
    const response = await PokerTournament.create(data);
    return response;
}
const getAllPokerTournaments = async () => {
    const response = await PokerTournament.find({}).populate("applyPokerTournamentUsers");
    if (!response || response.length === 0) {
        throw new Error("No poker tournaments found");
    }
    return response;
}

const getPokerTournamentById = async (id) => {
    const response = await PokerTournament.findById(id).populate("applyPokerTournamentUsers");

    if (!response) {
        throw new Error("Poker tournament not found");
    }
    return response;
}
const updatePokerTournament = async (id, { ...data }) => {
    const response = await PokerTournament.findByIdAndUpdate(id, { ...data }, {
        new: true, runValidators: true
    });
    if (!response) {
        throw new Error("Poker tournament not found");
    }
    return response;
}
const deletePokerTournament = async (id) => {
    const response = await PokerTournament.findByIdAndDelete(id);
    if (!response) {
        throw new Error("Poker tournament not found");
    }
    return response;
}

// here create a service for submit  poker tornament

const joinPokerTournament = async (data) => {
    const find = await JoinPokerTournament.findOne({ userId: data.userId, pokertournamentId: data.pokertournamentId });
    if (find) {
        throw new Error("User has already joined this poker tournament");
    }
    const applyAllPredictions = await PokerTournament.findById(data.pokertournamentId);
    if (!applyAllPredictions) {
        throw new Error("PokerTournament not found");
    }

    const response = await JoinPokerTournament.create(data);
    if (!response) {
        throw new Error("Failed to join poker tournament");
    }



    applyAllPredictions.applyPokerTournamentUsers.push(response._id);
    await applyAllPredictions.save();

    return response;
}

const fullDetailsPokerPredictionByIdAnduserId = async ({ userId, predictionId }) => {
    const pokerTournament = await PokerTournament.findById(predictionId)
        .populate({
            path: "applyPokerTournamentUsers",
            match: { userId }
        });

    const userInfo = await JoinPokerTournament.find({
        _id: userId,
        pokertournamentId: predictionId
    }).populate("userId");

    if (!pokerTournament || !userInfo) {
        throw new Error("No data found");
    }

    const response = { pokerTournament, userInfo }

    return response;
};


const declareWinning = async (userId, predictionId) => {

    // if already declared
    const alreadyDeclared = await JoinPokerTournament.findOne({ userId, pokertournamentId: predictionId, isWinner: true });
    if (alreadyDeclared) {
        throw new Error("User has already been declared the winner");
    }

    const response = await JoinPokerTournament.findOneAndUpdate(
        { _id: userId, pokertournamentId: predictionId },
        { isWinner: true },
        { new: true }
    );
    if (!response) {
        throw new Error("User not found or failed to declare winner");
    }
    return response;
};


module.exports = {
    createPokerTornament,
    getAllPokerTournaments,
    getPokerTournamentById,
    updatePokerTournament,
    deletePokerTournament,
    joinPokerTournament,
    declareWinning,
    fullDetailsPokerPredictionByIdAnduserId
};