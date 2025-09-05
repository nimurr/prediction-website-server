const { casinoReviewsService } = require("../services");
const catchAsync = require("../utils/catchAsync");

// controller
const createReview = catchAsync(async (req, res) => {
    const data = req.body;

    // Ensure arrays exist
    data.allInfo = data.allInfo || [];
    data.positivesSides = data.positivesSides || [];
    data.negativesSides = data.negativesSides || [];
    data.otherAllInfoTitleDescriptionImage = data.otherAllInfoTitleDescriptionImage || [];

    const response = await casinoReviewsService.createReview(data);

    res.status(201).json({
        status: "success",
        message: "Review created successfully",
        data: response
    });
});




const mainReviewDelete = catchAsync(async (req, res) => {
    const { id } = req.params;

    const response = await casinoReviewsService.mainReviewDelete(id)
    res.status(200).json({
        status: "success",
        message: "Reviews Delete successfully",
        data: response
    });
});

const handleChangeImage = catchAsync(async (req, res) => {
    const data = req.body;

    const bitcoinImage = req.file ? `/upload/image/${req.file.filename}` : undefined;

    data.image = bitcoinImage;

    const response = await casinoReviewsService.handleChangeImage(data)

    res.status(200).json({
        status: "success",
        message: "Reviews retrieved successfully",
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



const addNewSection = catchAsync(async (req, res) => {
    const data = req.body;
    const bitcoinImage = req.file ? `/upload/image/${req.file.filename}` : undefined;

    data.image = bitcoinImage;

    const response = await casinoReviewsService.addNewSection(data)
    res.status(200).json({
        status: "success",
        message: "Review Get successfully",
        data: response
    });
})

const addNewSectionDelete = catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await casinoReviewsService.addNewSectionDelete(id)

    res.status(200).json({
        status: "success",
        message: "Review Remove successfully",
        data: response
    });
})


module.exports = {
    createReview,
    handleChangeImage,
    mainReviewDelete,
    getAllReviews,
    getSingleReview,
    takeReview,
    getAllThisPostReviews,
    addNewSection,
    addNewSectionDelete
};