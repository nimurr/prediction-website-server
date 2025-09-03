const { privacyPolicyService } = require("../services");
const catchAsync = require("../utils/catchAsync");


const getPrivacyPolicy = catchAsync(async (req, res) => {
    const response = await privacyPolicyService.getPrivacyPolicy();
    res.status(200).json({
        message: "Privacy Policy content retrieved successfully.",
        data: response
    });
});


const updatePrivacyPolicy = catchAsync(async (req, res) => {
    const response = await privacyPolicyService.updatePrivacyPolicy(req.body);
    res.status(200).json({
        message: "Privacy Policy updated successfully.",
        data: response
    });
});


const createAddAds = catchAsync(async (req, res) => {

    console.log(req.body)

    if (req.file) {
        req.body.adsImage = `/upload/image/${req.file.filename}`;
    }

    const response = await privacyPolicyService.createAddAds(req.body);


    res.status(200).json({
        message: "Privacy Policy updated successfully.",
        data: response
    });
});

const updateAddAds = catchAsync(async (req, res) => {
    if (req.file) {
        req.body.adsImage = `/upload/image/${req.file.filename}`;
    }

    const data = req.body;
    const { id } = req.params; // <-- typo fixed: params not perams

    const response = await privacyPolicyService.updateAddAds({ data, id });

    res.status(200).json({
        message: "Ad updated successfully.",
        data: response
    });
});

module.exports = {
    getPrivacyPolicy,
    updatePrivacyPolicy,
    createAddAds,
    updateAddAds
};