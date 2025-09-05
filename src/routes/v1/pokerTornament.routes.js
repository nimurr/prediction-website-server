const express = require('express');
const catchAsync = require('../../utils/catchAsync');
const auth = require('../../middlewares/auth');
const { pokerTornamentController } = require('../../controllers');
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const convertHeicToPngMiddleware = require('../../middlewares/converter');

const UPLOADS_FOLDER_USERS = "./public/upload/image";
const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);

const router = express.Router();

router.post("/create", auth("admin"),
    [uploadUsers.single("uploadPokerTournamentImage")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
    pokerTornamentController.createPokerTornament);
router.get("/getall", pokerTornamentController.getAllPokerTournaments);
router.get("/single/:id", pokerTornamentController.getPokerTournamentById);
router.patch("/edit/:id", auth("admin"),
    [uploadUsers.single("uploadPokerTournamentImage")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
    pokerTornamentController.updatePokerTournament);
router.delete("/delete/:id", auth("admin"), pokerTornamentController.deletePokerTournament);

// here create a api for submit Join poker tornament

router.post("/join-tournament", auth("common"), pokerTornamentController.joinPokerTournament);
router.get("/full-poker-prediction", pokerTornamentController.fullDetailsPokerPredictionByIdAnduserId);
router.patch("/declare-winning", pokerTornamentController.declareWinning);

module.exports = router;