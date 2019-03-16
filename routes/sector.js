const router = require('express').Router();
const controller = require('../controllers/sector');

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
 *              "id": 9,
 *              "description": "Soldador",
 *              "createdAt": "2019-03-05T23:21:09.685Z",
 *              "updatedAt": "2019-03-05T23:21:09.685Z"
 *          },
 *          {
 *              "id": 10,
 *              "description": "Operador de Máquinas",
 *              "createdAt": "2019-03-05T23:21:09.686Z",
 *              "updatedAt": "2019-03-05T23:21:09.686Z"
 *          }
 *       ]
 *    }
 */
router.get('/', controller.get);

module.exports = router;