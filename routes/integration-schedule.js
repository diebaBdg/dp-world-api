const router = require('express').Router();
const controller = require('../controllers/integration-schedule');
const expressValidator = require('./middlewares/express-validator');
const validators = require('./validators/integration-schedule-validators');
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {get} /integration-schedules List of integration schedules
 * @apiName GetIntegrationSchedules
 * @apiGroup Integrations
 * 
 * @apiParam (Query params) page The page.
 * @apiParam (Query params) order_by A column to order.
 * @apiParam (Query params) order_direction The order direction (ASC or DESC).
 *
 * @apiSuccess {Int} count Number of total items.
 * @apiSuccess {Int} pages Number of pages.
 * @apiSuccess {Array} rows List of integrations schedules
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "count": 1,
 *       "pages": 1,
 *       "rows": []
 *    }
 */
router.get('/', validators.get, expressValidator.findsValidatorErros(), controller.get);

/**
 * @api {post} /integration-schedules Create a integration schedule
 * @apiName PostIntegrationSchedules
 * @apiGroup Integrations
 * 
 * @apiParam (Request body) {Int} IntegrationId  Integration id.
 * @apiParam (Request body) {Int} EmployeeId Employee id.
 *
 * @apiSuccess {Int} id Integration schedule inserted
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 201 OK
 *    {
 *        "id": 17,
 *        "msg": "Cadastrado com sucesso."
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros(), controller.post);

module.exports = router;