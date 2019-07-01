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
 * @apiParam (Request body) {Int} email Instructor email.
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
 *          {
 *              "id": 1,
 *              "name": "Nome do instrutor 1"
 *          },
 *          {
 *              "id": 2,
 *              "name": "Nome do instrutor 1"
 *           }
 *       ]
 *    }
 */
router.get('/', expressValidator.findsValidatorErros(), controller.get);

module.exports = router;