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
 * @apiParam (Query params) vizualized Filter by vizualized (true or false).
 *
 * @apiSuccess {Int} count Number of total items.
 * @apiSuccess {Int} pages Number of pages.
 * @apiSuccess {Array} rows List of notifications.
 */
router.get('/', validators.get, expressValidator.findsValidatorErros(), controller.get);

module.exports = router;