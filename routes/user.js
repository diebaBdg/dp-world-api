const router = require('express').Router();
const controller = require('../controllers/user');
const expressValidator = require('./middlewares/express-validator');
const validators = require('./validators/user-validators');
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {get} /users List of users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {Array} data List of users
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 */
router.get('/', controller.get);

/**
 * @api {patch} /users/:id Update user sector
 * @apiName PutUsers
 * @apiGroup Users
 *
 * @apiParam (Params) {Int} id The user id.
 * @apiParam (Request body) {Int} SectorId The sector id.
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 */
router.patch('/:id', validators.patch, expressValidator.findsValidatorErros(), controller.patch);

module.exports = router;