const { PricePrediction, SubmitPricePrediction, Notification } = require("../models");

const createPricePrediction = async ({ ...data }) => {

    const response = await PricePrediction.create(data);
    if (!response) {
        throw new Error("Failed to create price prediction");
    }
    await Notification.create({
        title: "New Price Prediction Created",
        content: "A new Price prediction has been created. Check it out!",
    });

    return response;
}

const getAllPricePredictions = async () => {
    const response = await PricePrediction.find({}).populate("applyPricePredictions").sort({ createdAt: -1 });
    if (!response) {
        throw new Error("No price predictions found please Create one");
    }
    return response;
}

const getPricePredictionById = async (id) => {
    const response = await PricePrediction.findById(id).populate("applyPricePredictions");
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

    const find = await SubmitPricePrediction.findOne({ userId: data.userId, pricePredictionId: data.pricePredictionId });
    if (find) {
        throw new Error("User has already submitted a prediction for this match");
    }
    // 1. Create the prediction

    const response = await SubmitPricePrediction.create(data);
    if (!response) {
        throw new Error("Failed to submit price prediction");
    }

    // 2. Find the PricePrediction document
    const pricePrediction = await PricePrediction.findById(data.pricePredictionId);
    if (!pricePrediction) {
        throw new Error("PricePrediction not found");
    }

    // 3. Push the new prediction ID into the array
    pricePrediction.applyPricePredictions.push(response._id);

    // 4. Save the updated document
    await pricePrediction.save();

    await Notification.create({
        title: "A New Price Prediction Submitted",
        content: "A user has submitted a new prediction. Check it out!",
    });

    return response;
};

const fullDetailsPricePredictionByIdAnduserId = async (userId, predictionId) => {
    const predictionInfo = await PricePrediction.findById(predictionId);
    const userInfo = await SubmitPricePrediction.find({ userId, pricePredictionId: predictionId }).populate("userId");
    if (!predictionInfo || !userInfo) {
        throw new Error("No data found");
    }
    const response = {
        predictionInfo,
        userInfo
    };
    return response;
};

const declareWinning = async (userId, predictionId) => {

    // if already declared
    const alreadyDeclared = await SubmitPricePrediction.findOne({ userId, pricePredictionId: predictionId, isWinner: true });
    if (alreadyDeclared) {
        throw new Error("User has already been declared the winner");
    }

    const response = await SubmitPricePrediction.findOneAndUpdate(
        { userId, pricePredictionId: predictionId },
        { isWinner: true },
        { new: true }
    );
    if (!response) {
        throw new Error("User not found or failed to declare winner");
    }
    return response;
};



module.exports = {
    createPricePrediction,
    getAllPricePredictions,
    getPricePredictionById,
    updatePricePrediction,
    deletePricePrediction,
    submitPricePrediction,
    fullDetailsPricePredictionByIdAnduserId,
    declareWinning
};