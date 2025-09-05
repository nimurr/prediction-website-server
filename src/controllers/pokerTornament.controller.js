const { pokerTornamentService } = require("../services");
const catchAsync = require("../utils/catchAsync");


const createPokerTornament = catchAsync(async (req, res) => {
    // Logic for creating a poker tournament prediction
    const uploadPokerTournamentImage = req.file ? `/upload/image/${req.file.filename}` : undefined;
    const response = await pokerTornamentService.createPokerTornament({ ...req.body, uploadPokerTournamentImage });
    res.status(201).json({
        message: "Poker tournament created successfully",
        status: "success",
        code: 201,
        data: response
    });
});

const getAllPokerTournaments = catchAsync(async (req, res) => {
    // Logic for getting all poker tournaments
    const response = await pokerTornamentService.getAllPokerTournaments();
    res.status(200).json({
        message: "All poker tournaments fetched successfully",
        status: "success",
        code: 200,
        data: response
    });
});
const getPokerTournamentById = catchAsync(async (req, res) => {
    // Logic for getting a single poker tournament by ID
    const response = await pokerTornamentService.getPokerTournamentById(req.params.id);
    res.status(200).json({
        message: "Poker tournament fetched successfully",
        status: "success",
        code: 200,
        data: response
    });
});
const updatePokerTournament = catchAsync(async (req, res) => {
    // Logic for updating a poker tournament
    const uploadPokerTournamentImage = req.file ? `/upload/image/${req.file.filename}` : undefined;
    const response = await pokerTornamentService.updatePokerTournament(req.params.id, { ...req.body, uploadPokerTournamentImage });
    res.status(200).json({
        message: "Poker tournament updated successfully",
        status: "success",
        code: 200,
        data: response
    });
});
const deletePokerTournament = catchAsync(async (req, res) => {
    // Logic for deleting a poker tournament
    const resposne = await pokerTornamentService.deletePokerTournament(req.params.id);

    res.status(200).json({
        message: "Poker tournament deleted successfully",
        status: "success",
        code: 200,
        data: resposne
    });
});

// here create a api for submit Join poker tornament


const joinPokerTournament = catchAsync(async (req, res) => {
    // Logic for joining a poker tournament
    const response = await pokerTornamentService.joinPokerTournament(req.body);
    res.status(200).json({
        message: "Joined poker tournament successfully",
        status: "success",
        code: 200,
        data: response
    });
});

const fullDetailsPokerPredictionByIdAnduserId = catchAsync(async (req, res) => {
    const { userId, predictionId } = req.query;
    const response = await pokerTornamentService.fullDetailsPokerPredictionByIdAnduserId({ userId, predictionId });
    res.status(200).send({
        message: 'Full details retrieved successfully',
        status: 'success',
        code: 200,
        data: response,
    });
});

const fullDetailsPoker = catchAsync(async (req, res) => {
    const { userId, predictionId } = req.query;
    const response = await pokerTornamentService.fullDetailsPoker(userId, predictionId);
    res.status(200).send({
        message: 'Full details retrieved successfully',
        status: 'success',
        code: 200,
        data: response,
    });
});

const declareWinning = catchAsync(async (req, res) => {
    const { userId, predictionId } = req.query;
    const response = await pokerTornamentService.declareWinning(userId, predictionId);
    res.status(200).send({
        message: 'Winning declared successfully',
        status: 'success',
        code: 200,
        data: response,
    });
});

module.exports = {
    createPokerTornament,
    getAllPokerTournaments,
    getPokerTournamentById,
    updatePokerTournament,
    deletePokerTournament,
    joinPokerTournament,
    fullDetailsPoker,
    declareWinning,
    fullDetailsPokerPredictionByIdAnduserId
};