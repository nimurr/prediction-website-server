const express = require('express');
const { scorePredictionController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.post('/create', auth("admin"), scorePredictionController.createScorePrediction);
router.get('/getall', scorePredictionController.getAllScorePredictions);
router.get('/single/:id', scorePredictionController.getSinglePredictions); // Added for consistency
router.patch('/edit/:id', auth("admin"), scorePredictionController.editScorePrediction); // Added for consistency
router.delete('/delete/:id', auth("admin"), scorePredictionController.deleteScorePrediction); // Added delete route


router.post("/submit-prediction", scorePredictionController.submitUserPrediction);


module.exports = router;