const router = require('express').Router();
const controller = require('../controllers/menu');
// // middleware to  find erros difined in routes validations
// const expressValidator = require('./middlewares/express-validator');
// // validators of this specifics routes
// const validators = require('./validators/sector-validators');
// // applying authentication in all routes
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {get} /menu List of company sectors
 * @apiName GetMenu
 * @apiGroup Menu
 *
 * @apiSuccess {Array} data Itens of menu
 */

router.get('/', controller.get);

module.exports = router;