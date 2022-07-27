const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const bodyParser = require('body-parser');

router.get('/rate', apiController.rateAction);
router.post('/subscribe', [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  apiController.subscribeAction
]);
router.post('/sendEmails', apiController.sendEmailsAction);

module.exports = router;
