const router = require('express').Router();
const controller = require('../controllers/document-type');

/**
 * @api {get} /document-types DocumentTypes
 * @apiGroup DocumentType
 *
 * @apiSuccess {Array} DocumentTypes List of Document Types
 * 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *    "documentTypes": [
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
 *    ]
 *    }
 */
router.get('/', controller.get);

module.exports = router;