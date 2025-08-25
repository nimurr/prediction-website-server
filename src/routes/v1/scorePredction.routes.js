const express = require('express');
const { scorePredictionController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const convertHeicToPngMiddleware = require('../../middlewares/converter');
const router = express.Router();

const UPLOADS_FOLDER_USERS = "./public/upload/image";

const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);

router.post('/create', auth("admin"),
    [uploadUsers.single("sportImage")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
    scorePredictionController.createScorePrediction);

router.get('/getall', scorePredictionController.getAllScorePredictions);
router.get('/single/:id', scorePredictionController.getSinglePredictions); // Added for consistency
router.patch('/edit/:id', auth("admin"),

    [uploadUsers.single("sportImage")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
    scorePredictionController.editScorePrediction); // Added for consistency
router.delete('/delete/:id', auth("admin"), scorePredictionController.deleteScorePrediction); // Added delete route


router.post("/submit-prediction", scorePredictionController.submitUserPrediction);


module.exports = router;