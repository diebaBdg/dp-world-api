const router = require('express').Router();
const controller = require('../controllers/integration');
const expressValidator = require('./middlewares/express-validator');
const validators = require('./validators/integration-validators');
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {get} /integrations List of integrations
 * @apiName GetIntegrations
 * @apiGroup Integrations
 * 
 * @apiParam (Query params) page The page.
 * @apiParam (Query params) order_by A column to order.
 * @apiParam (Query params) order_direction The order direction (ASC or DESC).
 *
 * @apiSuccess {Int} count Number of total items.
 * @apiSuccess {Int} pages Number of pages.
 * @apiSuccess {Array} rows List of integrations
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "count": 1,
 *       "pages": 1,
 *       "rows": [{
 *            "id": 1,
 *            "date": "2019-05-16T08:00:00.000Z",
 *            "vacancies": 3,
 *            "instructor": "Paul Mccartney",
 *            "note": "This integration is a test",
 *            "createdAt": "2019-04-17T02:49:06.905Z",
 *            "updatedAt": "2019-04-17T02:49:06.905Z"
 *         },{
 *            "id": 2,
 *            "date": "2019-05-19T10:00:00.000Z",
 *            "vacancies": 4,
 *            "instructor": "John Lennon",
 *            "note": "This integration is a test",
 *            "createdAt": "2019-04-17T02:49:06.905Z",
 *            "updatedAt": "2019-04-17T02:49:06.905Z"
 *         }]
 *    }
 */
router.get('/', validators.get, expressValidator.findsValidatorErros(), controller.get);

module.exports = router;