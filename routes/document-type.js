const router = require('express').Router();
const controller = require('../controllers/document-type');
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
 *              "updatedAt": "2019-03-05T23:21:09.702Z"
 *          },
 *          {
 *              "id": 2,
 *              "description": "Colaborador",
 *              "createdAt": "2019-03-05T23:21:09.702Z",
 *              "updatedAt": "2019-03-05T23:21:09.702Z"
 *          },
 *          {
 *              "id": 3,
 *              "description": "Mensais",
 *              "createdAt": "2019-03-05T23:21:09.702Z",
 *              "updatedAt": "2019-03-05T23:21:09.702Z"
 *          }
 *       ]
 *    }
 */
router.get('/', controller.get);

module.exports = router;