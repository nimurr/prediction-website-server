const { pricePredictionService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const createPricePrediction = catchAsync(async (req, res) => {
    const response = await pricePredictionService.createPricePrediction(req.body);
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
    const response = await pricePredictionService.updatePricePrediction(id, req.body);
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


module.exports = {
    createPricePrediction,
    getAllPricePredictions,
    getPricePredictionById,
    updatePricePrediction,
    deletePricePrediction

};