const router = require('express').Router();
const controller = require('../controllers/auth');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
const validators = require('./validators/auth-validators');

/**
 * @api {post} /auth User login
 * @apiName PostAuth
 * @apiGroup Auth
 *
 * @apiParam (Request body) {String} email User email
 * @apiParam (Request body) {String} password User password
 * 
 * @apiSuccess {String} token JWT access token
 * @apiSuccess {Object} user User data
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 201 OK
 *    {
 *       "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjR9.EMgfPykhYgKO--JNJk1AIRP63c2GXisb4tHdoJpxy2w",
 *       "user": {
 *           "id": 24,
 *           "name": "User Name",
 *           "userName": null,
 *           "email": "anyuser@gmail.com",
 *           "phone": null,
 *           "phone2": null,
 *           "createdAt": "2019-03-24T01:16:56.744Z",
 *           "updatedAt": "2019-03-24T01:16:56.744Z",
 *           "UserTypeId": 2,
 *           "UserStatusId": 1,
 *           "SectorId": null,
 *           "CompanyId": 33
 *       }
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros(), controller.post);

module.exports = router;