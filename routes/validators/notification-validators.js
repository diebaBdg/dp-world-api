const { check, validationResult } = require('express-validator/check');
const models = require('../../db/models');

// specific validator of company routes
exports.get = [
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
        .withMessage("Deve ser ASC ou DESC."),
    check('UserId')
        .optional()
        .isInt()
        .withMessage("Deve ser um número inteiro."),
    check('EmployeeId')
        .optional()
        .isInt()
        .withMessage("Deve ser um número inteiro."),
    check('visualized')
        .optional()
        .isIn(['true', 'false', 'TRUE', 'FALSE'])
        .withMessage("Deve ser true ou false.")
];