const router = require('express').Router();
const controller = require('../controllers/employee');
const expressValidator = require('./middlewares/express-validator');
const validators = require('./validators/employee-validators');
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {get} /employees List of employees
 * @apiName GetEmployees
 * @apiGroup Employees
 * 
 * @apiParam (Query params) page The page.
 * @apiParam (Query params) order_by A column to order.
 * @apiParam (Query params) order_direction The order direction (ASC or DESC).
 * @apiParam (Query params) CompanyId The company id.
 *
 * @apiSuccess {Int} count Number of total items.
 * @apiSuccess {Int} pages Number of pages.
 * @apiSuccess {Array} rows List of employees
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "count": 2,
 *       "pages": 1,
 *       "rows": []
 *    }
 */
router.get('/', validators.get, expressValidator.findsValidatorErros(), controller.get);

module.exports = router;