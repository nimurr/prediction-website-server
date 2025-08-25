const { TakeReview } = require("../models");


const takeReview = async (data) => {
    const review = await TakeReview.create(data);

    if (!review) {
        throw new Error('Failed to submit review');
    }

    return review;
}

module.exports = {
    takeReview
};