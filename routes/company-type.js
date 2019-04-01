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
 * @apiParam (Query params) {Int} page The page.
 * @apiParam (Query params) {String} order_by A column to order.
 * @apiParam (Query params) {String} order_direction The order direction (ASC or Desc).
 * @apiParam (Query params) {String} status Filter by status.
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
router.get('/', validators.get, expressValidator.findsValidatorErros(), controller.get);

/**
 * @api {post} /company-types Create a new company type
 * @apiName PostCompanyTypes
 * @apiGroup CompanyTypes
 *
 * @apiParam (Request body) {String} description The company type description.
 * 
 * @apiSuccess {Int} id Id of the company type inserted
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 201 OK
 *    {
 *        "id": 20,
 *        "msg": "Cadastrado com sucesso."
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros(), controller.post);

/**
 * @api {delete} /company-types/:id Delete a company type
 * @apiName DeleteCompanyTypes
 * @apiGroup CompanyTypes
 *
 * @apiParam (Params) {Int} id The company type id.
 * 
 * @apiSuccess {Int} deleted 1 if was deleted or 0 if is not
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 201 OK
 *    {
 *        "deleted": 1,
 *        "msg": "Excluído com sucesso"
 *    }
 */
router.delete('/:id', validators.delete, expressValidator.findsValidatorErros(), controller.delete);

/**
 * @api {put} /company-types/:id Update a company type
 * @apiName PutCompanyTypes
 * @apiGroup CompanyTypes
 *
 * @apiParam (Params) {Int} id The company type id.
 * @apiParam (Request body) {String} description Company type description.
 * @apiParam (Request body) {String} status Company type status.
 * 
 * @apiSuccess {Int} updated 1 if was updated or 0 if is not
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 200 OK
 *    {
 *        "updated": 1,
 *        "msg": "Alterado com sucesso."
 *    }
 */
router.put('/:id', validators.put, expressValidator.findsValidatorErros(), controller.put);

/**
 * @api {get} /company-types/:id/documents List the company type's documents
 * @apiName GetCompanyTypesDocumets
 * @apiGroup CompanyTypes
 * 
 * @apiParam (Params) {Int} id The company type id.
 * @apiParam (Query params) {String} DocumentTypeId Filter by document type.
 * @apiParam (Query params) {String} FunctionId Filter by collaborator function.
 *
 * @apiSuccess {Array} data List of documents
 * 
 */
router.get('/:id/documents', validators.getDocuments, expressValidator.findsValidatorErros(), controller.getDocuments);

/**
 * @api {post} /company-types/:id/documents Create company types's documents
 * @apiName PostCompanyTypesDocumets
 * @apiGroup CompanyTypes
 * 
 * @apiParam (Params) {Int} id The company type id.
 * @apiParam (Request body) {Array} documents List of documents.
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *	        "documents": [{
 *		        "DocumentId": 1,
 *		        "defaultValidity": "1day"
 *	        },{
 *		        "DocumentId": 3,
 *		        "defaultValidity": "1week"
 *	        }]
 *     }
 *
 * @apiSuccess {Array} msg Success message
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 201 OK
 *    {
 *        "msg": "Documents inserted"
 *    }
 */
router.post('/:id/documents', validators.postDocuments, expressValidator.findsValidatorErros(), controller.postDocuments);

/**
 * @api {delete} /company-types/:id/documents/:DocumentId Delete company type's document
 * @apiName DeleteCompanyTypesDocumets
 * @apiGroup CompanyTypes
 * 
 * @apiParam (Params) {Int} id The company type id.
 * @apiParam (Params) {Int} DocumentId The document id.
 *
 * @apiSuccess {Int} deleted 1 if the relation was deleted or 0 if is not
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 201 OK
 *    {
 *        "deleted": 1
 *    }
 */
router.delete('/:id/documents/:DocumentId', validators.deleteDocuments, expressValidator.findsValidatorErros(), controller.deleteDocuments);

/**
 * @api {put} /company-types/:id/documents/:DocumentId Update validity default of the company type's document
 * @apiName UpdateCompanyTypesDocumets
 * @apiGroup CompanyTypes
 * 
 * @apiParam (Params) {Int} id The company type id.
 * @apiParam (Params) {Int} DocumentId The document id.
 * @apiParam (Request body) {String} defaultValidity The new default validity.
 *
 * @apiSuccess {Int} updated 1 if the relation was updated or 0 if is not
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 201 OK
 *    {
 *        "updated": 1
 *    }
 */
router.put('/:id/documents/:DocumentId', validators.updateDocuments, expressValidator.findsValidatorErros(), controller.updateDocuments);

module.exports = router;