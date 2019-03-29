const { check, validationResult } = require('express-validator/check');

// specific validator of company routes

exports.get = [
    check('DocumentTypeId')
        .optional()
        .isInt()
        .withMessage("Deve ser um número inteiro."),
    check('status')
        .optional()
        .isInt({min:0, max:1})
        .withMessage("Deve ser 1 ou 0.")
];

exports.post = [
    check('description').isLength({ min: 3, max: 200 }).withMessage("Deve ter entre 3 e 200 caracteres.")
];