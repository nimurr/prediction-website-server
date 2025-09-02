const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const convertHeicToPngMiddleware = require("../../middlewares/converter");
const UPLOADS_FOLDER_USERS = "./public/upload/image";


const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);

const router = express.Router();

router.route("/self/in").get(auth("common"), userController.getProfile);

router
  .route("/self/update")
  .patch(
    auth("common"),
    validate(userValidation.updateUser),
    [uploadUsers.single("profileImage")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
    userController.updateProfile
  );
router
  .route("/dashboard-status")
  .get(auth("admin"), userController.getDashboardStatus);

router
  .route("/all-users")
  .get(auth("admin"), userController.getUsers);

router
  .route("/:userId")
  .get(auth("admin"), userController.getUser)

router
  .patch("/block/:userId", auth("admin"), userController.blockUser)

router
  .route("/my-prediction/all/:id",)
  .get(userController.getMyAllPredictions);


module.exports = router;
