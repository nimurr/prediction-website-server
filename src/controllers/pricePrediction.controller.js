const { pricePredictionService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const createPricePrediction = catchAsync(async (req, res) => {

    // const sportImage = req.file ? `/upload/image/${req.file.filename}` : undefined;
    const bitcoinImage = req.file ? `/upload/image/${req.file.filename}` : undefined;

    const response = await pricePredictionService.createPricePrediction({ ...req.body, bitcoinImage });
    res.status(201).send({
        message: 'Price prediction created successfully',
        status: 'success',
        code: 201,
        data: response,
    });
});
const getAllPricePredictions = catchAsync(async (req, res) => {
    const response = await pricePredictionService.getAllPricePredictions();
    res.status(200).send({
        message: 'All price predictions retrieved successfully',
        status: 'success',
        code: 200,
        data: response,
    });
});

const getPricePredictionById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await pricePredictionService.getPricePredictionById(id);
    res.status(200).send({
        message: 'Price prediction retrieved successfully',
        status: 'success',
        code: 200,
        data: response,
    });
});

const updatePricePrediction = catchAsync(async (req, res) => {
    const { id } = req.params;
    const bitcoinImage = req.file ? `/upload/image/${req.file.filename}` : undefined;
    const response = await pricePredictionService.updatePricePrediction(id, { ...req.body, bitcoinImage });
    res.status(200).send({
        message: 'Price prediction updated successfully',
        status: 'success',
        code: 200,
        data: response,
    });
});
const deletePricePrediction = catchAsync(async (req, res) => {
    const { id } = req.params;
    await pricePredictionService.deletePricePrediction(id);
    res.status(200).send({
        message: 'Price prediction deleted successfully',
        status: 'success',
        code: 200,
    });
});

// here care a some api for submit price prediction


const submitPricePrediction = catchAsync(async (req, res) => {
    const response = await pricePredictionService.submitPricePrediction(req.body);
    res.status(201).send({
        message: 'Price prediction submitted successfully',
        status: 'success',
        code: 201,
        data: response,
    });
});

const fullDetailsPricePredictionByIdAnduserId = catchAsync(async (req, res) => {
    const { userId, predictionId } = req.query;
    const response = await pricePredictionService.fullDetailsPricePredictionByIdAnduserId(userId, predictionId);
    res.status(200).send({
        message: 'Full details retrieved successfully',
        status: 'success',
        code: 200,
        data: response,
    });
});

module.exports = {
    createPricePrediction,
    getAllPricePredictions,
    getPricePredictionById,
    updatePricePrediction,
    deletePricePrediction,
    submitPricePrediction,
    fullDetailsPricePredictionByIdAnduserId
};