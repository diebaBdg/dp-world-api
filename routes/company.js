const router = require('express').Router();
const controller = require('../controllers/company');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
const validators = require('./validators/company-validators');

/**
 * @api {get} /companies List of companies
 * @apiName GetCompanies
 * @apiGroup Companies
 * 
 * @apiParam (Query params) {String} cnpj CNPJ of the company.
 *
 * @apiSuccess {Array} companies List of companies
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 200 OK
 *     {
 *           "data": [
 *               {
 *                  "id": 1,
 *                  "cnpj": "1636270000108",
 *                  "socialName": "Empresa Teste",
 *                  "businessName": "Empresa Teste",
 *                  "address": "Av Afonso Pena 3148",
 *                  "number": "1",
 *                  "complement": "apto 101",
 *                  "district": "Funcionários",
 *                  "city": "Belo Horizonte",
 *                  "state": "MG",
 *                  "country": "Brazil",
 *                  "cep": "30130012",
 *                  "phone": "31989915622",
 *                  "inscricaoEstadual": "12354885",
 *                  "site": "http://www.semsite.com.br",
 *                  "createdAt": "2019-03-19T01:31:18.329Z",
 *                  "updatedAt": "2019-03-19T01:31:18.329Z",
 *                  "CompanyStatusId": 1,
 *                  "CompanyTypeId": 1,
 *                  "CompanyId": null
 *              },
 *              {
 *                  "id": 2,
 *                  "cnpj": "32325649000179",
 *                  "socialName": "Empresa Teste 2",
 *                  "businessName": "Empresa Teste 2",
 *                  "address": "Av Afonso Pena 3148",
 *                  "number": "1",
 *                  "complement": "apto 101",
 *                  "district": "Funcionários",
 *                  "city": "Belo Horizonte",
 *                  "state": "MG",
 *                  "country": "Brazil",
 *                  "cep": "30130012",
 *                  "phone": "31989915622",
 *                  "inscricaoEstadual": "12354885",
 *                  "site": "http://www.semsite.com.br",
 *                  "createdAt": "2019-03-19T01:31:18.329Z",
 *                  "updatedAt": "2019-03-19T01:31:18.329Z",
 *                  "CompanyStatusId": 1,
 *                  "CompanyTypeId": 1,
 *                  "CompanyId": 1
 *              }
 *           ]
 *       }
 */
router.get('/', controller.get);

/**
 * @api {post} /companies Create a new company
 * @apiName PostCompanies
 * @apiGroup Companies
 * 
 * @apiParam (Request body) {Array} cnpj Brazilian document number.
 * @apiParam (Request body) {Array} socialName Social name.
 * @apiParam (Request body) {Array} businessName List Business name.
 * @apiParam (Request body) {Array} address The local of the company.
 * @apiParam (Request body) {Array} number Th street number.
 * @apiParam (Request body) {Array} complement The complement address.
 * @apiParam (Request body) {Array} district The district.
 * @apiParam (Request body) {Array} city The city.
 * @apiParam (Request body) {Array} state The state or province.
 * @apiParam (Request body) {Array} country The country.
 * @apiParam (Request body) {Array} cep The postal code.
 * @apiParam (Request body) {Array} phone THe phone number.
 * @apiParam (Request body) {Array} inscricaoEstadual Brazilian document number.
 * @apiParam (Request body) {Array} site Company web site.
 * @apiParam (Request body) {Array} CompanyTypeId Company type.
 * @apiParam (Request body) {Array} CompanyId If is outsourced, the id of the company contractor.
 * 
 * 
 * @apiSuccess {Json} company Companie inserted
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 201 OK
 *    {
 *        "id": 19
 *    }
 */
router.post('/',
    validators.post
    , expressValidator.findsValidatorErros()
    , controller.post
);

module.exports = router;