const router = require('express').Router();
const controller = require('../controllers/document');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
const validators = require('./validators/document-validators');

/**
 * @api {get} /documents List of documents
 * @apiName GetDocuments
 * @apiGroup Documents
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
 *              "DocumentTypeId": 5
 *          },
 *          {
 *              "id": 4,
 *              "description": "Documento Teste",
 *              "status": 1,
 *              "createdAt": "2019-03-06T22:52:28.186Z",
 *              "updatedAt": "2019-03-06T22:52:28.186Z",
 *              "DocumentTypeId": 5
 *          }
 *       ]
 *    }
 */
router.get('/', controller.get);

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
 *    HTTP/1.1 200 OK
 *    {
 *        "id": 20
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros(), controller.post);

module.exports = router;