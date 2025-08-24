const express = require('express');
const { pricePredictionController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

// Example route: POST /api/v1/price-prediction
router.post('/create', auth("admin"), pricePredictionController.createPricePrediction);
router.get('/getall', pricePredictionController.getAllPricePredictions);
router.get('/single/:id', pricePredictionController.getPricePredictionById);
router.patch('/edit/:id', auth("admin"), pricePredictionController.updatePricePrediction); // Assuming you have an update function
router.delete('/delete/:id', auth("admin"), pricePredictionController.deletePricePrediction); //


module.exports = router;