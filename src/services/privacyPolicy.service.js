const { PrivacyPolicy, Ads } = require("../models");

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

const createAddAds = async (data) => {
    try {
        const ad = new Ads({
            adsImage: data.adsImage,
            adsLink: data.adsLink,
            adsTitle: data.adsTitle
        });

        const response = await ad.save();
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error creating ad:", error);
        throw error;
    }
};


const updateAddAds = async ({ data, id }) => {
    const updatedAd = await Ads.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
    );
    return updatedAd;
};



module.exports = {
    getPrivacyPolicy,
    updatePrivacyPolicy,
    createAddAds,
    updateAddAds
};