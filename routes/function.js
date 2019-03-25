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
 * @apiParam (Query params) {String} DocumentTypeId The filter document type id.
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
 * @apiSuccess {Json} function Function inserted
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 201 OK
 *    {
 *        "id": 17
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros() , controller.post);

module.exports = router;