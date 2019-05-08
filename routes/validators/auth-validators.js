const { check, validationResult } = require('express-validator/check');

exports.post = [
    check('email')
        .isEmail()
        .withMessage("Deve ser um email"),
    check('password')
        .isLength({min:3, max: 50})
        .withMessage("Deve ter entre 3 e 50 caracteres.")
];