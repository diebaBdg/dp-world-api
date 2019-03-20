const router = require('express').Router();
const controller = require('../controllers/user-type');

/**
 * @api {get} /user-types List of user types
 * @apiName GetUserTypes
 * @apiGroup UserTypes
 *
 * @apiSuccess {Array} data List of user types
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "data": [
 *       ]
 *    }
 */
router.get('/', controller.get);

module.exports = router;