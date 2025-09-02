const { casinoReviewsService } = require("../services");
const catchAsync = require("../utils/catchAsync");


const createReview = catchAsync(async (req, res) => {
    const data = req.body;
    const response = await casinoReviewsService.createReview(data);

    res.status(201).json({
        status: "success",
        message: "Review created successfully",
        data: response
    });
});

const getAllReviews = catchAsync(async (req, res) => {
    const response = await casinoReviewsService.getAllReviews();

    res.status(200).json({
        status: "success",
        message: "Reviews retrieved successfully",
        data: response
    });
});


const getSingleReview = catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await casinoReviewsService.getSingleReview(id);

    res.status(200).json({
        status: "success",
        message: "Review retrieved successfully",
        data: response
    });
});


const takeReview = catchAsync(async (req, res) => {
    const data = req.body;

    const response = await casinoReviewsService.takeReview(data);

    res.status(201).json({
        status: "success",
        message: "Review submitted successfully",
        data: response
    });
});

const getAllThisPostReviews = catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await casinoReviewsService.getAllThisPostReviews(id)
    res.status(200).json({
        status: "success",
        message: "Review Get successfully",
        data: response
    });
})


module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    takeReview,
    getAllThisPostReviews
};