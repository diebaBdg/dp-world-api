const { check, validationResult } = require('express-validator/check');

// specific validator of company routes
exports.get = [
    check('CompanyId')
        .optional()
        .isInt()
        .withMessage("Deve ser um número inteiro."),
    check('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage("Deve ser um inteiro maior ou igual a 1."),
    check('order_by')
        .optional()
        .isLength({ min: 1, max: 200 })
        .withMessage("Deve ter entre 1 e 200 caracteres."),
    check('order_direction')
        .optional()
        .isIn(['ASC', 'DESC'])
        .withMessage("Deve ser ASC ou DESC.")
];