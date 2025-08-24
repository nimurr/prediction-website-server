const { PokerTournament } = require("../models");

const createPokerTornament = async (data) => {
    const response = await PokerTournament.create(data);
    return response;
}
const getAllPokerTournaments = async () => {
    const response = await PokerTournament.find({});
    if (!response || response.length === 0) {
        throw new Error("No poker tournaments found");
    }
    return response;
}

const getPokerTournamentById = async (id) => {
    const response = await PokerTournament.findById(id);

    if (!response) {
        throw new Error("Poker tournament not found");
    }
    return response;
}
const updatePokerTournament = async (id, data) => {
    const response = await PokerTournament.findByIdAndUpdate(id, data, {
        new:
            true, runValidators: true
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



module.exports = {
    createPokerTornament,
    getAllPokerTournaments,
    getPokerTournamentById,
    updatePokerTournament,
    deletePokerTournament
};