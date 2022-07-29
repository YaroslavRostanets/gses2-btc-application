const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const bodyParser = require('body-parser');

router.get('/rate', apiController.rateAction);
router.post('/subscribe', [
  bodyParser.json(),
  bodyParser.urlencoded({extended: true}),
  apiController.subscribeAction
]);
router.post('/sendEmails', apiController.sendEmailsAction);

module.exports = router;
/**
 * @api {post} /api/sendEmail Send E-mail's
 * @apiName SendEmails
 * @apiGroup API
 *
 * @apiSuccess {Object} result
 * @apiSuccess {String} result.description Rate description
 * @apiSuccess {Array} [result.unsent] List of emails to which it was not possible to send
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "description": "E-mailʼи відправлено",
 *       "unsent": ["lala@com.ua"]
 *     }
 */

/**
 * @api {post} /api/subscribe Subscribe
 * @apiName Subscribe
 * @apiGroup API
 *
 * @apiHeader {String} Content-Type:application/x-www-form-urlencoded Type of transmitted content
 * @apiBody {String} email email of user
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "description": "E-mail додано"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "description": "Поле e-mail невірне або відсутнє"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "description": "E-mail вже є в базі даних (файловій)"
 *     }
 */

 /**
 * @api {get} /api/rate BTC-UAH rate information
 * @apiName GetActualRate
 * @apiGroup API
 *
 * @apiSuccess {Object} result
 * @apiSuccess {Number} result.rate Actual exchange rate
 * @apiSuccess {String} result.description Rate description
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "rate": 869376.32,
 *       "description": "1BTC = 869376.32UAH"
 *     }
 */


