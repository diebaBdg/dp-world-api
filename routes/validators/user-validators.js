const { check, validationResult } = require('express-validator/check');

// specific validator of company routes
exports.patch = [
    check('id')
        .isInt()
        .withMessage("Deve um inteiro."),
    check('SectorId')
        .isInt()
        .withMessage("Deve um inteiro.")
];