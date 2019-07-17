const router = require('express').Router();
const controller = require('../controllers/integration');
const expressValidator = require('./middlewares/express-validator');
const validators = require('./validators/integration-validators');
const auth = require("../config/auth")();
// router.use(auth.authenticate());

/**
 * @api {get} /integrations List of integrations
 * @apiName GetIntegrations
 * @apiGroup Integrations
 * 
 * @apiParam (Query params) page The page.
 * @apiParam (Query params) order_by A column to order.
 * @apiParam (Query params) order_direction The order direction (ASC or DESC).
 * @apiParam (Query params) occurrence The occurrence (PAST or FUTURE).
 * @apiParam (Query params) closed If integration is closed or oppened (TRUE or FALSE).
 *
 * @apiSuccess {Int} count Number of total items.
 * @apiSuccess {Int} pages Number of pages.
 * @apiSuccess {Array} rows List of integrations
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "count": 1,
 *       "pages": 1,
 *       "rows": [{
 *            "id": 1,
 *            "date": "2019-05-16T08:00:00.000Z",
 *            "vacancies": 3,
 *            "instructor": "Paul Mccartney",
 *            "note": "This integration is a test",
 *            "createdAt": "2019-04-17T02:49:06.905Z",
 *            "updatedAt": "2019-04-17T02:49:06.905Z"
 *         },{
 *            "id": 2,
 *            "date": "2019-05-19T10:00:00.000Z",
 *            "vacancies": 4,
 *            "instructor": "John Lennon",
 *            "note": "This integration is a test",
 *            "createdAt": "2019-04-17T02:49:06.905Z",
 *            "updatedAt": "2019-04-17T02:49:06.905Z"
 *         }]
 *    }
 */
router.get('/', validators.get, expressValidator.findsValidatorErros(), controller.get);

/**
 * @api {get} /integrations/:id/presence-list Get a presence list
 * @apiName GetIntegrationsPresenceList
 * @apiGroup Integrations
 * 
 * @apiParam (Query params) id The integration id.
 *
 * @apiSuccess {File} pdf
 */
router.get('/:id/presence-list', controller.getPresenceList);

/**
 * @api {post} /integrations Create a integration
 * @apiName PostIntegrations
 * @apiGroup Integrations
 * 
 * @apiParam (Request body) {Date} date A integration date and hour in format YYYY-MM-DD HH:MM:SS.
 * @apiParam (Request body) {Int} vacancies The amount of vacancies in integration.
 * @apiParam (Request body) {String} instructor The instructor of the integration.
 * @apiParam (Request body) {String} note A note about the integration.
 * @apiParam (Request body) {Array} instructors A array with instructors ids.
 *
 * @apiSuccess {Int} id Integration inserted
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 201 OK
 *    {
 *       "id": 17,
 *       "msg": "Cadastrado com sucesso."
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros(), controller.post);

/**
 * @api {delete} /integrations/:id Delete a integration
 * @apiName DeleteIntegrations
 * @apiGroup Integrations
 * 
 * @apiParam (Params) {Int} id  Integration id.
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

/**
 * @api {put} /integrations/:id Update a integration
 * @apiName PutIntegrations
 * @apiGroup Integrations
 * 
 * @apiParam (Params) {Int} id  Integration id.
 * @apiParam (Request body) {Date} date A integration date and hour in format YYYY-MM-DD HH:MM:SS.
 * @apiParam (Request body) {Int} vacancies The amount of vacancies in integration.
 * @apiParam (Request body) {String} instructor The instructor of the integration.
 * @apiParam (Request body) {String} note A note about the integration.
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
 * @api {patch} /integrations/:id/close Close a integration
 * @apiName PostIntegrationsClose
 * @apiGroup Integrations
 * 
 * @apiParam (Request body) {Int} id Integration id.
 *
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 201 OK
 */
router.patch('/:id/close', validators.close, expressValidator.findsValidatorErros(), controller.close);

module.exports = router;