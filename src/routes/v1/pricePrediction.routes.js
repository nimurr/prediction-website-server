const express = require('express');
const { pricePredictionController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const convertHeicToPngMiddleware = require('../../middlewares/converter');

const UPLOADS_FOLDER_USERS = "./public/upload/image";
const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);


const router = express.Router();

// Example route: POST /api/v1/price-prediction
router.post('/create', auth("admin"),
    [uploadUsers.single("bitcoinImage")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS)
    , pricePredictionController.createPricePrediction);

router.get('/getall', pricePredictionController.getAllPricePredictions);
router.get('/single/:id', pricePredictionController.getPricePredictionById);
router.patch('/edit/:id', auth("admin"),
    [uploadUsers.single("bitcoinImage")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
    pricePredictionController.updatePricePrediction); // Assuming you have an update function
    
router.delete('/delete/:id', auth("admin"), pricePredictionController.deletePricePrediction); //

// here care a some api for submit price prediction

router.post('/submit', pricePredictionController.submitPricePrediction);

module.exports = router;