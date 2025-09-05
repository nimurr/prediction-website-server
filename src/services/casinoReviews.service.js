const { TakeReview, Review, AddNewSection, HandleChangeImage } = require("../models");



// service
const createReview = async (data) => {
    const review = await Review.create(data);
    if (!review) {
        throw new Error('Failed to create review');
    }

    console.log(review);
    return review;
};

const mainReviewDelete = async (id) => {
    const review = await Review.deleteOne({ _id: id });
    if (!review) {
        throw new Error('Failed to create review');
    }

    return review;
};



const handleChangeImage = async (data) => {
    const review = await HandleChangeImage.create(data);
    if (!review) {
        throw new Error('Failed to create review');
    }

    console.log(review);
    return review;
};


const getAllReviews = async () => {
    const reviews = await Review.find({}).populate("reviewedUsers");
    if (!reviews) {
        throw new Error('Failed to retrieve reviews');
    }
    return reviews;
};

const getSingleReview = async (id) => {
    const review = await Review.findById(id).populate("reviewedUsers");
    if (!review) {
        throw new Error('Failed to retrieve review');
    }
    return review;
};

const takeReview = async (data) => {
    const review = await TakeReview.create(data);
    if (!review) {
        throw new Error('Failed to submit review');
    }

    const reviewedUsers = await Review.findById(review.postId);

    reviewedUsers.reviewedUsers.push(review._id);
    await reviewedUsers.save();

    return review;
}

const getAllThisPostReviews = async (id) => {
    const response = await TakeReview.find({ postId: id });
    if (!response) {
        throw new Error('Review not Found !!!')
    }
    return response
}

const addNewSection = (data) => {
    const response = AddNewSection.create(data)
    return response;
}

const addNewSectionDelete = (id) => {
    const response = AddNewSection.deleteOne({ _id: id })
    return response;
}




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