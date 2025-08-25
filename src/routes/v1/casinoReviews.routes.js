const express = require('express');
const { casinoReviewsController } = require('../../controllers');
const router = express.Router();


router.post('/take-review', casinoReviewsController.takeReview);


module.exports = router;