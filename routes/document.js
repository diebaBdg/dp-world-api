const router = require('express').Router();
const controller = require('../controllers/document');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
// const companyValidators = require('./company-validators');

/**
 * @api {get} /documents Documents
 * @apiGroup Sistema
 *
 * @apiSuccess {Array} documents List of documents
 * 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *     {
 *   "companies": [
 *       {
 *           "id": 3,
 *           "description": "Documento Teste",
 *           "status": 1,
 *           "createdAt": "2019-03-06T02:29:06.613Z",
 *           "updatedAt": "2019-03-06T02:29:06.613Z",
 *           "DocumentTypeId": 5
 *       },
 *       {
 *           "id": 4,
 *           "description": "Documento Teste",
 *           "status": 1,
 *           "createdAt": "2019-03-06T22:52:28.186Z",
 *           "updatedAt": "2019-03-06T22:52:28.186Z",
 *           "DocumentTypeId": 5
 *       }
 *   ]
 *}
 */
router.get('/', controller.get);

/**
 * @api {post} /documents Documents
 * @apiGroup Sistema
 *
 * @apiSuccess {Json} document Document inserted
 * 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *     {
 *           "id": 19,
 *           "cnpj": "33333333333333",
 *           "updatedAt": "2019-03-04T20:20:01.453Z",
 *           "createdAt": "2019-03-04T20:20:01.453Z"
 *       }
 */
router.post('/'
    , controller.post
);

module.exports = router;