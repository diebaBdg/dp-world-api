const router = require('express').Router();
const controller = require('../controllers/document-type');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
const validators = require('./validators/document-type-validators');
// applying authentication in all routes
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {get} /document-types List of document types
 * @apiName GetDocumentTypes
 * @apiGroup DocumentTypes
 *
 * @apiSuccess {Array} data List of Document Types
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "data": [
 *          {
 *              "id": 1,
 *              "description": "Empresa",
 *              "createdAt": "2019-03-05T23:21:09.702Z",
 *              "updatedAt": "2019-03-05T23:21:09.702Z",
 *              "status": 1
 *          },
 *          {
 *              "id": 2,
 *              "description": "Colaborador",
 *              "createdAt": "2019-03-05T23:21:09.702Z",
 *              "updatedAt": "2019-03-05T23:21:09.702Z",
 *              "status": 1
 *          },
 *          {
 *              "id": 3,
 *              "description": "Mensais",
 *              "createdAt": "2019-03-05T23:21:09.702Z",
 *              "updatedAt": "2019-03-05T23:21:09.702Z",
 *              "status": 1
 *          }
 *       ]
 *    }
 */
router.get('/', validators.get, expressValidator.findsValidatorErros(),controller.get);

/**
 * @api {post} /document-types Create a new document type
 * @apiName PostDocumentTypes
 * @apiGroup DocumentTypes
 *
 * @apiParam (Request body) {String} description The document type description.
 * 
 * @apiSuccess {Int} id Id of the document type inserted
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
 * @api {put} /document-types/:id Update a document type
 * @apiName PutDocumentTypes
 * @apiGroup DocumentTypes
 *
 * @apiParam (Params) {Int} id The document type id.
 * @apiParam (Request body) {String} description The document type description.
 * @apiParam (Request body) {String} status Company type status.
 * 
 * @apiSuccess {Int} updated 1 if was updated or 0 if is not
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 201 OK
 *    {
 *        "updated": 1,
 *        "msg": "Alterado com sucesso."
 *    }
 */
router.put('/:id', validators.put, expressValidator.findsValidatorErros(), controller.put);

/**
 * @api {delete} /document-types/:id Delete a document type
 * @apiName DeleteDocumentTypes
 * @apiGroup DocumentTypes
 *
 * @apiParam (Params) {Int} id The document type id.
 * 
 * @apiSuccess {Int} deleted 1 if was deleted or 0 if is not
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 201 OK
 *    {
 *        "deleted": 1,
 *        "msg": "Excluído com sucesso."
 *    }
 */
router.delete('/:id', validators.delete, expressValidator.findsValidatorErros(), controller.delete);

module.exports = router;