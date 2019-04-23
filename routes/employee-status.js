const router = require('express').Router();
const controller = require('../controllers/employee-status');
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {get} /employee-status List of employees status
 * @apiName GetEmployeesStatus
 * @apiGroup Employees
 * 
 * @apiSuccess {Int} count Number of total items.
 * @apiSuccess {Array} rows List of employees
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