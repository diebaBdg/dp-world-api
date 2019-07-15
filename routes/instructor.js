const router = require('express').Router();
const controller = require('../controllers/instructor');
const expressValidator = require('./middlewares/express-validator');
const validators = require('./validators/instructor-validator');
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {post} /instructors Create a new instructor
 * @apiName PostInstructors
 * @apiGroup Instructors
 *
 * @apiParam (Request body) {String} email Instructor email.
 * @apiParam (Request body) {String} name Instructor name.
 * @apiParam (Request body) {Int} SectorId Sector id.
 * 
 * @apiSuccess {Int} id Instructor id
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 201 OK
 *    {
 *        "id": 17,
 *        "msg": "Cadastrado com sucesso."
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros() , controller.post);

/**
 * @api {get} /instructors List of instructors
 * @apiName GetInstructors
 * @apiGroup Instructors
 * 
 * @apiSuccess {Array} data List of sector documents
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "data": [
 *           {
        *    "id": 1,
        *    "name": "Jonathan",
        *    "userName": "jonathan",
        *    "email": "velosojonathan5@gmail.com",
        *    "phone": "37999223568",
        *    "phone2": "31989915622",
        *    "password": "e10adc3949ba59abbe56e057f20f883e",
        *    "hash": null,
        *    "createdAt": "2019-07-01T02:04:44.431Z",
        *    "updatedAt": "2019-07-01T02:04:44.431Z",
        *    "CompanyId": 1,
        *    "UserTypeId": 1,
        *    "UserStatusId": 1,
        *    "SectorId": 5,
        *    "Sector": {
        *      "id": 5,
        *      "name": "Segurança do trabalho",
        *      "status": 1,
        *      "createdAt": "2019-07-01T02:04:44.375Z",
        *      "updatedAt": "2019-07-01T02:04:44.375Z"
        *    }
        * }
 *       ]
 *    }
 */
router.get('/', expressValidator.findsValidatorErros(), controller.get);

module.exports = router;