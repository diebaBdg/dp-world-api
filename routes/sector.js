const router = require('express').Router();
const controller = require('../controllers/sector');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
const validators = require('./validators/sector-validators');
// applying authentication in all routes
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {get} /sectors List of company sectors
 * @apiName GetSectors
 * @apiGroup Sectors
 *
 * @apiParam (Query params) {String} status Sector status.
 * 
 * @apiSuccess {Array} data List of sectors
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "data": [
 *          {
 *              "id": 1,
 *              "name": "RH",
 *              "status": 1,
 *              "createdAt": "2019-03-16T14:47:46.782Z",
 *              "updatedAt": "2019-03-16T14:47:46.782Z"
 *          },
 *          {
 *              "id": 2,
 *              "name": "Controladoria",
 *              "status": 1,
 *              "createdAt": "2019-03-16T14:47:46.782Z",
 *              "updatedAt": "2019-03-16T14:47:46.782Z"
 *          },
 *          {
 *              "id": 3,
 *              "name": "CDI",
 *              "status": 1,
 *              "createdAt": "2019-03-16T14:47:46.782Z",
 *              "updatedAt": "2019-03-16T14:47:46.782Z"
 *          }
 *       ]
 *    }
 */
router.get('/', validators.get, expressValidator.findsValidatorErros(), controller.get);

/**
 * @api {post} /sectors Create a new sector
 * @apiName PostSectors
 * @apiGroup Sectors
 *
 * @apiParam (Request body) {String} name Sector name.
 * 
 * @apiSuccess {Int} id Sector id
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "id": 1,
 *       "msg": "Cadastrado com sucesso."
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros(), controller.post);

/**
 * @api {put} /sectors/:id Update a sector
 * @apiName PutSectors
 * @apiGroup Sectors
 *
 * @apiParam (Query params) {Int} id The sector id.
 * @apiParam (Request body) {String} name Sector name.
 * @apiParam (Request body) {Int} status Sector status.
 * 
 * @apiSuccess {Int} updated 1 if was updated or 0 if is not
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "updated": 1,
 *       "msg": "Cadastrado com sucesso."
 *    }
 */
router.put('/:id', validators.put, expressValidator.findsValidatorErros(), controller.put);

/**
 * @api {delete} /sectors/:id Delete a sector
 * @apiName DeleteSectors
 * @apiGroup Sectors
 *
 * @apiParam (Query params) {Int} id The sector id.
 * 
 * @apiSuccess {Int} deleted 1 if was deleted or 0 if is not
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "deleted": 1,
 *       "msg": "Excluído com sucesso."
 *    }
 */
router.delete('/:id', validators.delete, expressValidator.findsValidatorErros(), controller.delete);

/**
 * @api {get} /sectors/:id/documents List of company sector documents
 * @apiName GetSectorDocuments
 * @apiGroup Sectors
 *  
 * @apiParam (Query params) {String} DocumentTypeId Filter by document type.
 * 
 * @apiSuccess {Array} data List of sector documents
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "data": [
 *          {
 *              "id": 1,
 *              "description": "Formulário de requisição de credenciamento",
 *              "status": 1,
 *              "createdAt": "2019-03-08T22:54:43.116Z",
 *              "updatedAt": "2019-03-08T22:54:43.116Z",
 *              "DocumentTypeId": 1,
 *              "FunctionId": null,
 *              "DocumentToSectors": {
 *                  "createdAt": "2019-03-16T17:52:28.864Z",
 *                  "updatedAt": "2019-03-16T17:52:28.864Z",
 *                  "DocumentId": 1,
 *                  "SectorId": 1
 *              }
 *          },
 *          {
 *              "id": 2,
 *              "description": "Certidão estadual",
 *              "status": 1,
 *              "createdAt": "2019-03-08T22:54:43.116Z",
 *              "updatedAt": "2019-03-08T22:54:43.116Z",
 *              "DocumentTypeId": 1,
 *              "FunctionId": 1,
 *              "DocumentToSectors": {
 *                  "createdAt": "2019-03-16T18:00:23.555Z",
 *                  "updatedAt": "2019-03-16T18:00:23.555Z",
 *                  "DocumentId": 2,
 *                  "SectorId": 1
 *              }
 *           }
 *       ]
 *    }
 */
router.get('/:id/documents', validators.getDocuments, expressValidator.findsValidatorErros(), controller.getDocuments);

/**
 * @api {post} /sectors/:id/documents Create sector documents
 * @apiName PostSectorDocuments
 * @apiGroup Sectors
 * 
 * @apiParam (Params) {Int} id The company type id.
 * @apiParam (Request body) {Array} documents List of documents.
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *	        "documents": [{
 *		        "DocumentId": 1
 *	        },{
 *		        "DocumentId": 2
 *	        }]
 *     }
 *  
 * @apiSuccess {Array} data List of sector documents
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "msg": "Documents inserted"
 *    }
 */
router.post('/:id/documents', validators.postDocuments, expressValidator.findsValidatorErros(), controller.postDocuments);

/**
 * @api {delete} /sectors/:id/documents/:DocumentId Delete sector document
 * @apiName DeleteSectorDocument
 * @apiGroup Sectors
 * 
 * @apiParam (Params) {Int} id The company type id.
 * @apiParam (Params) {Int} DocumentId The document id.
 * 
 * @apiSuccess {Int} deleted 1 if the relation was deleted or 0 if is not
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "deleted": 1
 *    }
 */
router.delete('/:id/documents/:DocumentId', validators.deleteDocuments, expressValidator.findsValidatorErros(), controller.deleteDocuments);

module.exports = router;