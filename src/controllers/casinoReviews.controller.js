const { casinoReviewsService } = require("../services");
const catchAsync = require("../utils/catchAsync");


const takeReview = catchAsync(async (req, res) => {
    const data = req.body;


    const response = await casinoReviewsService.takeReview(data);

    res.status(201).json({
        status: "success",
        message: "Review submitted successfully",
        data: response
    });
});


module.exports = {
    takeReview
};