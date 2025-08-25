const { PricePrediction, SubmitPricePrediction } = require("../models");

const createPricePrediction = async ({ ...data }) => {

    const response = await PricePrediction.create(data);
    if (!response) {
        throw new Error("Failed to create price prediction");
    }

    return response;
}

const getAllPricePredictions = async () => {
    const response = await PricePrediction.find({});
    if (!response) {
        throw new Error("No price predictions found please Create one");
    }
    return response;
}

const getPricePredictionById = async (id) => {
    const response = await PricePrediction.findById(id);
    if (!response) {
        throw new Error("Price prediction not found");
    }
    return response;
}
const updatePricePrediction = async (id, { ...data }) => {
    const response = await PricePrediction.findByIdAndUpdate(id, { ...data }, { new: true });
    if (!response) {
        throw new Error("Failed to update price prediction");
    }
    return response;
}
const deletePricePrediction = async (id) => {
    const response = await PricePrediction.findByIdAndDelete(id);
    if (!response) {
        throw new Error("Failed to delete price prediction");
    }
    return response;
}

// here care a some api for submit price prediction

const submitPricePrediction = async (data) => {
    const response = await SubmitPricePrediction.create(data);
    if (!response) {
        throw new Error("Failed to submit price prediction");
    }
    return response;
};

module.exports = {
    createPricePrediction,
    getAllPricePredictions,
    getPricePredictionById,
    updatePricePrediction,
    deletePricePrediction,
    submitPricePrediction
};