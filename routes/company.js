const router = require('express').Router();
const controller = require('../controllers/company');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
const companyValidators = require('./company-validators');

/**
 * @api {get} /companies Companies
 * @apiGroup Sistema
 *
 * @apiSuccess {Array} companies List of companies
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *     {
 *           "companies": [
 *               {
 *                   "id": 3,
 *                   "cnpj": "22222222222222",
 *                   "createdAt": "2019-02-26T01:26:30.065Z",
 *                   "updatedAt": "2019-02-26T01:26:30.065Z"
 *               },
 *               {
 *                   "id": 4,
 *                   "cnpj": "11111111111111",
 *                   "createdAt": "2019-02-26T01:33:42.295Z",
 *                   "updatedAt": "2019-02-26T01:33:42.295Z"
 *               }
 *           ]
 *       }
 */
router.get('/', controller.get);

/**
 * @api {post} /companies Companies
 * @apiGroup Sistema
 *
 * @apiSuccess {Json} company Companie inserted
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *     {
 *           "id": 19,
 *           "cnpj": "33333333333333",
 *           "updatedAt": "2019-03-04T20:20:01.453Z",
 *           "createdAt": "2019-03-04T20:20:01.453Z"
 *       }
 */
router.post('/',
    companyValidators.post
    , expressValidator.findsValidatorErros()
    , controller.post
);

module.exports = router;