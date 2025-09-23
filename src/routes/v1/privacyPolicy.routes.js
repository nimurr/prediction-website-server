const express = require('express');
const { privacyPolicyController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const userFileUploadMiddleware = require("../../middlewares/fileUpload");
const convertHeicToPngMiddleware = require("../../middlewares/converter");
const { Notification } = require('../../models');
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

router.get('/all/notification', auth("admin"), async (req, res) => {
    try {
        const allNotifications = await Notification.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: allNotifications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.patch('/unread/notification/:id', auth("admin"), async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }
        notification.status = "read";
        await notification.save();
        res.status(200).json({
            success: true,
            message: 'Notification marked as read',
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


module.exports = router;