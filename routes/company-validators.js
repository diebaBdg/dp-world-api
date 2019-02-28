const { check, validationResult } = require('express-validator/check');

// specific validator of company routes
exports.post = [
    check('cnpj').isNumeric()
];