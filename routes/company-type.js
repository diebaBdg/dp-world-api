const router = require('express').Router();
const controller = require('../controllers/company-type');

/**
 * @api {get} /company-types List of company types
 * @apiName GetCompanyTypes
 * @apiGroup CompanyTypes
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
router.get('/', controller.get);

module.exports = router;