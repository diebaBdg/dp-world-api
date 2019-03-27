const router = require('express').Router();
const controller = require('../controllers/document');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
const validators = require('./validators/document-validators');
// applying authentication in all routes
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {get} /documents List of documents
 * @apiName GetDocuments
 * @apiGroup Documents
 * 
 * @apiParam (Query params) {String} DocumentTypeId Filter by document type.
 * @apiParam (Query params) {String} FunctionId Filter by collaborator function.
 *
 * @apiSuccess {Array} data List of documents
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "data": [
 *          {
 *              "id": 3,
 *              "description": "Documento Teste",
 *              "status": 1,
 *              "createdAt": "2019-03-06T02:29:06.613Z",
 *              "updatedAt": "2019-03-06T02:29:06.613Z",
 *              "DocumentTypeId": 5,
 *              "FunctionId": null
 *          },
 *          {
 *              "id": 4,
 *              "description": "Documento Teste",
 *              "status": 1,
 *              "createdAt": "2019-03-06T22:52:28.186Z",
 *              "updatedAt": "2019-03-06T22:52:28.186Z",
 *              "DocumentTypeId": 5,
 *              "FunctionId": 1
 *          }
 *       ]
 *    }
 */
router.get('/', validators.get, expressValidator.findsValidatorErros(), controller.get);

/**
 * @api {post} /documents Create a new document
 * @apiName PostDocuments
 * @apiGroup Documents
 *
 * @apiParam (Request body) {String} description The function description.
 * @apiParam (Request body) {Int} DocumentTypeId The id of the document type.
 * @apiParam (Request body) {Int} FunctionId The id of the function.
 * 
 * @apiSuccess {Int} id Id of the document inserted
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 201 OK
 *    {
 *        "id": 20
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros(), controller.post);

/**
 * @api {put} /documents/:id Update a document
 * @apiName PutDocuments
 * @apiGroup Documents
 *
 * @apiParam (Params) {Int} id The document id.
 * @apiParam (Request body) {String} description The function description.
 * @apiParam (Request body) {Int} DocumentTypeId The id of the document type.
 * @apiParam (Request body) {Int} FunctionId The id of the function.
 * 
 * @apiSuccess {Int} updated 1 if was updated or 0 if is not
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 201 OK
 *    {
 *        "updated": 1
 *    }
 */
router.put('/:id', validators.put, expressValidator.findsValidatorErros(), controller.put);

/**
 * @api {delete} /documents/:id Delete a document
 * @apiName DeleteDocuments
 * @apiGroup Documents
 *
 * @apiParam (Params) {Int} id The document id.
 * 
 * @apiSuccess {Int} deleted 1 if was deleted or 0 if is not
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 201 OK
 *    {
 *        "deleted": 1
 *    }
 */
router.delete('/:id', validators.delete, expressValidator.findsValidatorErros(), controller.delete);

module.exports = router;