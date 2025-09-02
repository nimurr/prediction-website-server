const express = require('express');
const { casinoReviewsController } = require('../../controllers');
const router = express.Router();

router.post('/create', casinoReviewsController.createReview);
router.get("/all", casinoReviewsController.getAllReviews);
router.get("/single/:id", casinoReviewsController.getSingleReview);

router.post('/take-review', casinoReviewsController.takeReview);
router.get("/all-review/:id", casinoReviewsController.getAllThisPostReviews)


module.exports = router;