const router = require('express').Router();
const controller = require('../controllers/integration-schedule');
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {get} /integrations-schedules List of integration schedules
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
router.get('/', controller.get);

module.exports = router;