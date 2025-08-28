const { scorePredictionService } = require("../services");
const catchAsync = require("../utils/catchAsync");


const createScorePrediction = catchAsync(async (req, res) => {
    // Logic for creating a score prediction

    const sportImage = req.file ? `/upload/image/${req.file.filename}` : undefined;

    const data = req.body;
    const response = await scorePredictionService.createScorePrediction({ ...data, sportImage });

    res.status(201).json({
        message: 'Score prediction created successfully',
        data: response
    });
})
const getAllScorePredictions = catchAsync(async (req, res) => {
    // Logic for getting all score predictions
    const response = await scorePredictionService.getAllScorePredictions();

    res.status(200).json({
        message: 'All score predictions retrieved successfully',
        data: response
    });
});

const getSinglePredictions = catchAsync(async (req, res) => {
    // Logic for getting a single score prediction by ID
    const { id } = req.params;
    const response = await scorePredictionService.getSinglePredictions(id);
    if (!response) {
        return res.status(404).json({
            message: 'Score prediction not found'
        });
    }
    res.status(200).json({
        message: 'Score prediction retrieved successfully',
        data: response
    });
});

const editScorePrediction = catchAsync(async (req, res) => {
    // Logic for editing a score prediction
    const sportImage = req.file ? `/upload/image/${req.file.filename}` : undefined;

    const { id } = req.params;
    const data = req.body;
    const response = await scorePredictionService.editScorePrediction(id, { ...data, sportImage });

    if (!response) {
        return res.status(404).json({
            message: 'Score prediction not found'
        });
    }

    res.status(200).json({
        message: 'Score prediction updated successfully',
        data: response
    });
});


const deleteScorePrediction = catchAsync(async (req, res) => {
    // Logic for deleting a score prediction    
    const { id } = req.params;
    const response = await scorePredictionService.deleteScorePrediction(id);
    if (!response) {
        return res.status(404).json({
            message: 'Score prediction not found'
        });
    }
    res.status(200).json({
        message: 'Score prediction deleted successfully',
        data: response
    });
});

const submitUserPrediction = catchAsync(async (req, res) => {
    const data = req.body;
    const response = await scorePredictionService.submitUserPrediction(data);

    res.status(200).json({
        code: 200,
        message: 'User prediction submitted successfully',
        data: response
    });
});


const fullDetailsPredictionByIdAnduserId = catchAsync(async (req, res) => {

    // search params for userId and predictionId
    const { userId, predictionId } = req.query;

    const response = await scorePredictionService.fullDetailsPredictionByIdAnduserId(userId, predictionId);
    res.status(200).json({
        message: 'User predictions retrieved successfully',
        data: response
    });
});


const declareWinning = catchAsync(async (req, res) => {
    const { userId, predictionId } = req.query;
    const response = await scorePredictionService.declareWinning(userId, predictionId);
    res.status(200).json({
        code: 200,
        message: 'Winning declared successfully',
        data: response
    });
});

module.exports = {
    createScorePrediction,
    getAllScorePredictions,
    getSinglePredictions,
    editScorePrediction,
    deleteScorePrediction,
    fullDetailsPredictionByIdAnduserId,
    declareWinning,
    submitUserPrediction
};