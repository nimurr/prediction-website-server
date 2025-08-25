const { TakeReview, Review } = require("../models");



const createReview = async (data) => {
    const review = await Review.create(data);
    if (!review) {
        throw new Error('Failed to create review');
    }
    return review;
};

const getAllReviews = async () => {
    const reviews = await Review.find();
    if (!reviews) {
        throw new Error('Failed to retrieve reviews');
    }
    return reviews;
};

const getSingleReview = async (id) => {
    const review = await Review.findById(id);
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

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    takeReview
};