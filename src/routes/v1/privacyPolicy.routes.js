const express = require('express');
const { privacyPolicyController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

// Example: GET privacy policy
router.get('/', privacyPolicyController.getPrivacyPolicy);

// Example: POST to update privacy policy
router.post('/', auth("admin"), privacyPolicyController.updatePrivacyPolicy);

module.exports = router;