const { check, validationResult } = require('express-validator/check');

// specific validator of company routes

exports.get = [
    check('DocumentTypeId').optional({nullable: true}).isInt().withMessage("Deve ser um número inteiro.")
];

exports.post = [
    check('description').isLength({min:3, max: 200}).withMessage("Deve ter entre 3 e 200 caracteres.")
];