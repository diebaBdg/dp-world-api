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

/**
 * @api {post} /employees Create a employee
 * @apiName PostEmployees
 * @apiGroup Employees
 * 
 * @apiParam (Request body) {String} name Employee name.
 * @apiParam (Request body) {Date} birthDate The birth date. format: YYYY-MM-DD
 * @apiParam (Request body) {String} sector The description about the employee sector.
 * @apiParam (Request body) {String} rg Brazilian personal document.
 * @apiParam (Request body) {String} cpf Brazilian personal document number.
 * @apiParam (Request body) {String} phone The phone number.
 * @apiParam (Request body) {String} email The employee email.
 * @apiParam (Request body) {String} address The local of the company.
 * @apiParam (Request body) {String} number The street number.
 * @apiParam (Request body) {String} complement The complement address.
 * @apiParam (Request body) {String} district The district.
 * @apiParam (Request body) {String} city The city.
 * @apiParam (Request body) {String} state The state or province.
 * @apiParam (Request body) {String} country The country.
 * @apiParam (Request body) {String} cep The postal code.
 * @apiParam (Request body) {Int} CompanyId The company id.
 * @apiParam (Request body) {Int} FunctionId The function id.
 *
 * @apiSuccess {Int} id Function inserted
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *        "id": 17,
 *        "msg": "Cadastrado com sucesso."
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros(), controller.post);


module.exports = router;