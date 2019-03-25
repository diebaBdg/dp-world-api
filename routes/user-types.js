const router = require('express').Router();
const controller = require('../controllers/user-type');
// applying authentication in all routes
const auth = require("../config/auth")();
router.use(auth.authenticate());

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