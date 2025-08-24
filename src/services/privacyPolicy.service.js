const { PrivacyPolicy } = require("../models");

const getPrivacyPolicy = async () => {
    const response = await PrivacyPolicy.findOne();
    if (!response) {
        throw new Error("Privacy Policy not found please create one.");
    }
    return response;
}

const updatePrivacyPolicy = async (data) => {
    // if find then update else create
    const response = await PrivacyPolicy.find();
    if (!response) {
        throw new Error("Failed to update Privacy Policy.");
    }
    if (response.length > 0) {
        // Update existing Privacy Policy
        const updatedResponse = await PrivacyPolicy.findByIdAndUpdate(response[0]._id, data, { new: true });
        if (!updatedResponse) {
            throw new Error("Failed to update Privacy Policy.");
        }
        return updatedResponse;
    } else {
        // Create new Privacy Policy
        const newPrivacyPolicy = new PrivacyPolicy(data);
        const savedResponse = await newPrivacyPolicy.save();
        if (!savedResponse) {
            throw new Error("Failed to create Privacy Policy.");
        }
        return savedResponse;
    }
}
module.exports = {
    getPrivacyPolicy,
    updatePrivacyPolicy
};