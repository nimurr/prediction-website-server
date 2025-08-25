const { ScorePrediction, SubmitPrediction } = require("../models");

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
    const response = await ScorePrediction.find({});
    if (!response) {
        throw new Error("No score predictions found");
    }
    return response;
}

const getSinglePredictions = async (id) => {
    // Logic for getting a single score prediction by ID

    const response = await ScorePrediction.findById(id);
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




module.exports = {
    createScorePrediction,
    getAllScorePredictions,
    getSinglePredictions,
    editScorePrediction,
    deleteScorePrediction,
    submitUserPrediction
};