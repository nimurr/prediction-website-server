const express = require('express');
const catchAsync = require('../../utils/catchAsync');
const auth = require('../../middlewares/auth');
const { pokerTornamentController } = require('../../controllers');
const router = express.Router();

router.post("/create", auth("admin"), pokerTornamentController.createPokerTornament);
router.get("/getall", pokerTornamentController.getAllPokerTournaments);
router.get("/single/:id", pokerTornamentController.getPokerTournamentById);
router.patch("/edit/:id", auth("admin"), pokerTornamentController.updatePokerTournament);
router.delete("/delete/:id", auth("admin"), pokerTornamentController.deletePokerTournament);

// here create a api for submit Join poker tornament

router.post("/join-tournament", auth("common"), pokerTornamentController.joinPokerTournament);


module.exports = router;