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
 * @apiParam (Request body) {String} cnpj Brazilian document number.
 * @apiParam (Request body) {String} socialName Social name.
 * @apiParam (Request body) {String} contactEmail Contact email.
 * @apiParam (Request body) {String} contactName Contact name.
 * @apiParam (Request body) {String} businessName List Business name.
 * @apiParam (Request body) {String} address The local of the company.
 * @apiParam (Request body) {String} number The street number.
 * @apiParam (Request body) {String} complement The complement address.
 * @apiParam (Request body) {String} district The district.
 * @apiParam (Request body) {String} city The city.
 * @apiParam (Request body) {String} state The state or province.
 * @apiParam (Request body) {String} country The country.
 * @apiParam (Request body) {String} cep The postal code.
 * @apiParam (Request body) {String} phone The phone number.
 * @apiParam (Request body) {String} inscricaoEstadual Brazilian document number.
 * @apiParam (Request body) {String} site Company web site.
 * @apiParam (Request body) {Int}    CompanyTypeId Company type.
 * @apiParam (Request body) {Int}    CompanyId If is outsourced, the id of the company contractor.
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

/**
 * @api {put} /companies/:id Update a company
 * @apiName PutCompanies
 * @apiGroup Companies
 * 
 * @apiParam (Params) {Int} id The company id.
 * @apiParam (Request body) {Int} SectorId Company sector.
 * @apiParam (Request body) {Int} CompanyStatusId Company sector.
 * 
 * @apiSuccess {Int} updated 1 if the item was updated or 0 if is not
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 201 OK
 *    {
 *        "updated": 1
 *    }
 */
router.put('/:id', validators.put, expressValidator.findsValidatorErros(), controller.put);

module.exports = router;