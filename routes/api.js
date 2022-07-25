const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/rate', apiController.rateAction);
router.post('/subscribe', apiController.subscribeAction);

module.exports = router;
