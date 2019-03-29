const router = require('express').Router();
const controller = require('../controllers/function');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
const validators = require('./validators/function-validators');
// applying authentication in all routes
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {get} /functions List of collaborators functions
 * @apiName GetFunctions
 * @apiGroup Functions
 * 
 * @apiParam (Query params) {Int} DocumentTypeId The filter document type id.
 * @apiParam (Query params) {Int} status The document status.
 *
 * @apiSuccess {Array} data List of functions
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
router.get('/', validators.get, expressValidator.findsValidatorErros(), controller.get);

/**
 * @api {post} /functions Create a new function
 * @apiName PostFunctions
 * @apiGroup Functions
 *
 * @apiParam (Request body) {String} description The function description.
 * 
 * @apiSuccess {Int} id Function inserted
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
 * @api {put} /functions/:id Update a function
 * @apiName PutFunctions
 * @apiGroup Functions
 *
 * @apiParam (Params) {Int} id The function id.
 * @apiParam (Request body) {String} description The function description.
 * @apiParam (Request body) {Int} status The function status.
 * 
 * @apiSuccess {Int} updated 1 if was updated or 0 if is not
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 201 OK
 *    {
 *        "updated": 1,
 *        "msg": "Alterado com sucesso."
 *    }
 */
router.put('/:id', validators.put, expressValidator.findsValidatorErros(), controller.put);

module.exports = router;