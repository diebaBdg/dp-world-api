const router = require('express').Router();
const controller = require('../controllers/company');
const expressValidator = require('./middlewares/express-validator');
const companyValidators = require('./company-validators');

router.get('/', controller.get);

router.post('/', 
    companyValidators.post
    , expressValidator.findsValidatorErros()
    , controller.post
);

module.exports = router;