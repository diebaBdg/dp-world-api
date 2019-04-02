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
 * @apiParam (Query params) {Int} page The page.
 * @apiParam (Query params) {String} order_by A column to order.
 * @apiParam (Query params) {String} order_direction The order direction (ASC or DESC).
 * @apiParam (Query params) {Int} status Filter by status.
 * @apiParam (Query params) {Int} DocumentTypeId Filter by document type id.
 *
 * @apiSuccess {Int} count Number of total items.
 * @apiSuccess {Array} rows List of Document Types
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "count": 2,
 *       "rows": [
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

/**
 * @api {delete} /functions/:id Delete a function
 * @apiName DeleteFunctions
 * @apiGroup Functions
 *
 * @apiParam (Params) {Int} id The function id.
 * 
 * @apiSuccess {Int} deleted 1 if was deleted or 0 if is not
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *        "deleted": 1,
 *        "msg": "Excluído com sucesso."
 *    }
 */
router.delete('/:id', validators.delete, expressValidator.findsValidatorErros(), controller.delete);

module.exports = router;