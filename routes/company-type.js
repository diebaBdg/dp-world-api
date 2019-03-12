const router = require('express').Router();
const controller = require('../controllers/company-type');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
const validators = require('./validators/company-type-validators');

/**
 * @api {get} /company-types List of company types
 * @apiName GetCompanyTypes
 * @apiGroup CompanyTypes
 *
 * @apiSuccess {Array} data List of company types
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "data": [
 *          {
 *               "id": 1,
 *               "description": "Estrangeiro",
 *               "status": 1,
 *               "createdAt": "2019-03-11T03:48:19.020Z",
 *               "updatedAt": "2019-03-11T03:48:19.020Z"
 *          },
 *          {
 *               "id": 2,
 *               "description": "Fornecimento",
 *               "status": 1,
 *               "createdAt": "2019-03-11T03:48:19.020Z",
 *               "updatedAt": "2019-03-11T03:48:19.020Z"
 *          }
 *       ]
 *    }
 */
router.get('/', controller.get);

/**
 * @api {post} /company-types Create a new company type
 * @apiName PostCompanyTypes
 * @apiGroup CompanyTypes
 *
 * @apiParam (Request body) {String} description The company type description.
 * 
 * @apiSuccess {Int} id Id of the company type inserted
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 201 OK
 *    {
 *        "id": 20
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros(), controller.post);

/**
 * @api {delete} /company-types Delete a company type
 * @apiName DeleteCompanyTypes
 * @apiGroup CompanyTypes
 *
 * @apiParam (Params) {Int} id The company type id.
 * 
 * @apiSuccess {Int} id Id of the company type deleted
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 200 OK
 *    {
 *        "id": 20
 *    }
 */
router.delete('/:id', validators.delete, expressValidator.findsValidatorErros(), controller.delete);

module.exports = router;