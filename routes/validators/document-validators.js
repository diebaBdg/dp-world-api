const { check, validationResult } = require('express-validator/check');

// specific validator of company routes
exports.get = [
    check('DocumentTypeId').optional({nullable: true}).isInt().withMessage("Should be an integer."),
    check('FunctionId').optional({nullable: true}).isInt().withMessage("Should be an integer.")
];

exports.post = [
    check('description').isLength({min:3, max: 200}).withMessage("Should be between 3 and 200 characters."),
    check('DocumentTypeId').isInt().withMessage("Should be an integer."),
    check('FunctionId').optional({nullable: true}).isInt().withMessage("Should be an integer.")
];