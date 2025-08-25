const { TakeReview, Review } = require("../models");



const createReview = async (data) => {
    const review = await Review.create(data);
    if (!review) {
        throw new Error('Failed to create review');
    }
    return review;
};







const takeReview = async (data) => {
    const review = await TakeReview.create(data);
    if (!review) {
        throw new Error('Failed to submit review');
    }
    return review;
}

module.exports = {
    createReview,
    takeReview
};