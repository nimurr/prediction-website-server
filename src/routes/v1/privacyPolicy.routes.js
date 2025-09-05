const express = require('express');
const { privacyPolicyController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const convertHeicToPngMiddleware = require("../../middlewares/converter");
const UPLOADS_FOLDER_USERS = "./public/upload/image";
const uploadUsers = userFileUploadMiddleware(UPLOADS_FOLDER_USERS);

const router = express.Router();

// Example: GET privacy policy
router.get('/', privacyPolicyController.getPrivacyPolicy);

// Example: POST to update privacy policy
router.post('/', auth("admin"), privacyPolicyController.updatePrivacyPolicy);

router.post('/add-ads', auth("admin"),
    [uploadUsers.single("adsImage")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS),
    privacyPolicyController.createAddAds)
router.patch('/update-ads/:id', auth("admin"), [uploadUsers.single("adsImage")],
    convertHeicToPngMiddleware(UPLOADS_FOLDER_USERS), privacyPolicyController.updateAddAds)

module.exports = router;