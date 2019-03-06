const router = require('express').Router();
const controller = require('../controllers/document');
// middleware to  find erros difined in routes validations
const expressValidator = require('./middlewares/express-validator');
// validators of this specifics routes
const companyValidators = require('./company-validators');

/**
 * @api {post} /documents Documents
 * @apiGroup Sistema
 *
 * @apiSuccess {Json} document Document inserted
 * 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *     {
 *           "id": 19,
 *           "cnpj": "33333333333333",
 *           "updatedAt": "2019-03-04T20:20:01.453Z",
 *           "createdAt": "2019-03-04T20:20:01.453Z"
 *       }
 */

router.post('/'
    , controller.post
);

module.exports = router;