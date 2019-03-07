const router = require('express').Router();
const controller = require('../controllers/function');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
const validators = require('./validators/function-validators');

/**
 * @api {get} /functions Functions
 * @apiGroup Sistema
 *
 * @apiSuccess {Array} functions List of functions
 * 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *    "functions": [
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
 *   }
 */
router.get('/', controller.get);

/**
 * @api {post} /functions Functions
 * @apiGroup Sistema
 *
 * @apiParam (Request body) {Array} description The function description.
 * 
 * @apiSuccess {Json} function Function inserted
 * 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *          "id": 17,
 *          "description": "Mecanico de balão",
 *          "updatedAt": "2019-03-07T00:30:06.478Z",
 *          "createdAt": "2019-03-07T00:30:06.478Z"
 *     }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros() , controller.post);

module.exports = router;