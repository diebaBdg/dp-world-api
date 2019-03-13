const { check, validationResult } = require('express-validator/check');

// specific validator of company routes
exports.post = [
    check('description').isLength({min:3, max: 200}).withMessage("Should be between 3 and 200 characters.")
];

exports.delete = [
    check('id').isInt().withMessage("Should be an integer.")
];

exports.getDocuments = [
    check('id').isInt().withMessage("Should be an integer."),
    check('DocumentTypeId').optional({nullable: true}).isInt().withMessage("Should be an integer."),
    check('FunctionId').optional({nullable: true}).isInt().withMessage("Should be an integer.")
];

exports.postDocuments = [
    check('id').isInt().withMessage("Should be an integer."),
    check('documents').isArray().isLength({min:1}).withMessage("Shoud be a list with at least 1 item."),
    check('documents.*.DocumentId').isInt().withMessage("Should be an integer."),
    check('documents.*.defaultValidity').optional({nullable: true}).isAlphanumeric().withMessage("Should be an date description.")
];