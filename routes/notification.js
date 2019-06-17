const router = require('express').Router();
const controller = require('../controllers/notification');
const expressValidator = require('./middlewares/express-validator');
const validators = require('./validators/notification-validators');
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {get} /notifications List of notifications
 * @apiName GetNotifications
 * @apiGroup Notifications
 * 
 * @apiParam (Query params) page The page.
 * @apiParam (Query params) order_by A column to order.
 * @apiParam (Query params) order_direction The order direction (ASC or DESC).
 * @apiParam (Query params) occurrence The occurrence (PAST or FUTURE).
 * @apiParam (Query params) UserId Filter by user id.
 * @apiParam (Query params) EmployeeId Filter by employee id.
 * @apiParam (Query params) visualized Filter by vizualized (true or false).
 *
 * @apiSuccess {Int} count Number of total items.
 * @apiSuccess {Int} pages Number of pages.
 * @apiSuccess {Array} rows List of notifications.
 */
router.get('/', validators.get, expressValidator.findsValidatorErros(), controller.get);

/**
 * @api {patch} /notifications/:id Set notification visualized
 * @apiName PatchNotifications
 * @apiGroup Notifications
 * 
 * @apiParam (Params) {Int} id Notification id.
 * 
 * @apiParam (Request body) {Boolean} visualized If it is visualized (true or false).
 *
 * @apiSuccess {Int} updated 1 if was updated or 0 if is not
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 201 OK
 *    {
 *        "updated": 1,
 *        "msg": "Alterado com sucesso."
 *    }
 */
router.patch('/:id', validators.patch, expressValidator.findsValidatorErros(), controller.patch);

module.exports = router;