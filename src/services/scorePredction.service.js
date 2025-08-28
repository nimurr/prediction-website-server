const { ScorePrediction, SubmitPrediction, User } = require("../models");

const createScorePrediction = async ({ ...data }) => {

    // Logic for creating a score prediction
    const response = await ScorePrediction.create(data);
    if (!response) {
        throw new Error("Failed to create score prediction");
    }
    return response;
}

const getAllScorePredictions = async () => {
    // Logic for getting all score predictions
    const response = await ScorePrediction.find({}).populate("applyAllPredictions");
    if (!response) {
        throw new Error("No score predictions found");
    }
    return response;
}

const getSinglePredictions = async (id) => {
    // Logic for getting a single score prediction by ID

    const response = await ScorePrediction.findById(id).populate("applyAllPredictions");
    if (!response) {
        throw new Error("Score prediction not found");
    }
    return response;
}

const editScorePrediction = async (id, { ...data }) => {
    // Logic for editing a score prediction
    const response = await ScorePrediction.findByIdAndUpdate(id, { ...data }, { new: true });
    if (!response) {
        throw new Error("Score prediction not found or failed to update");
    }
    return response;
}

const deleteScorePrediction = async (id) => {
    // Logic for deleting a score prediction
    const response = await ScorePrediction.findByIdAndDelete(id);
    if (!response) {
        throw new Error("Score prediction not found or failed to delete");
    }
    return response;
}

const submitUserPrediction = async (data) => {

    const find = await SubmitPrediction.findOne({ userId: data.userId, predictionId: data.predictionId });
    if (find) {
        throw new Error("User has already submitted a prediction for this match");
    }
    // 1. Create the prediction
    const response = await SubmitPrediction.create(data);
    if (!response) {
        throw new Error("Failed to submit user prediction");
    }

    // 2. Find the ScorePrediction document
    const scorePrediction = await ScorePrediction.findById(data.predictionId);
    if (!scorePrediction) {
        throw new Error("ScorePrediction not found");
    }

    // 3. Push the new prediction ID into the array
    scorePrediction.applyAllPredictions.push(response._id);

    // 4. Save the updated document
    await scorePrediction.save();

    return response;
};


const fullDetailsPredictionByIdAnduserId = async (userId, predictionId) => {
    // Logic for getting full details of a prediction by user ID and prediction ID
    const predictionInfo = await ScorePrediction.findById(predictionId);
    const userInfo = await SubmitPrediction.find({ userId, predictionId }).populate("userId");
    if (!predictionInfo || !userInfo) {
        throw new Error("Prediction or User not found");
    }
    const response = {
        prediction: predictionInfo,
        user: userInfo
    };
    return response;
};

const declareWinning = async (userId, predictionId) => {

    // if already declared
    const alreadyDeclared = await SubmitPrediction.findOne({ userId, predictionId, isWinner: true });
    if (alreadyDeclared) {
        throw new Error("User has already been declared the winner");
    }

    // Logic for declaring a user as the winner
    const response = await SubmitPrediction.findOneAndUpdate(
        { userId, predictionId },
        { isWinner: true },
        { new: true }
    );
    if (!response) {
        throw new Error("User not found or failed to declare winner");
    }
    return response;
};

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