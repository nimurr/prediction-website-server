const express = require('express');
const { casinoReviewsController } = require('../../controllers');
const router = express.Router();

// route
const convertHeicToPngMiddleware = require('../../middlewares/converter');
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const UPLOADS_FOLDER_USERS = "./public/upload/image";
const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);

router.post('/create', casinoReviewsController.createReview
);
router.post("/image/upload", [uploadUsers.single("image")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS), casinoReviewsController.handleChangeImage)


router.get("/all", casinoReviewsController.getAllReviews);
router.get("/single/:id", casinoReviewsController.getSingleReview);
router.delete('/all/:id', casinoReviewsController.mainReviewDelete)

router.post('/take-review', casinoReviewsController.takeReview);
router.get("/all-review/:id", casinoReviewsController.getAllThisPostReviews)
router.post('/sub/add-new-section',
    [uploadUsers.single("image")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
    casinoReviewsController.addNewSection);
router.delete('/sub/add-new-section/:id', casinoReviewsController.addNewSectionDelete)


module.exports = router;