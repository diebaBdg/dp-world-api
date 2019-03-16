const router = require('express').Router();
const controller = require('../controllers/sector');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
const validators = require('./validators/sector-validators');

/**
 * @api {get} /sectors List of company sectors
 * @apiName GetSectors
 * @apiGroup Sectors
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
router.get('/', controller.get);

/**
 * @api {get} /sectors List of company sector documents
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
router.get('/:id/documents', validators.getDocuments, expressValidator.findsValidatorErros(), controller.getDocuments);

module.exports = router;