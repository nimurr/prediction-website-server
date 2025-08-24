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


module.exports = {
    getPrivacyPolicy,
    updatePrivacyPolicy
};