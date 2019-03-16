const { check, validationResult } = require('express-validator/check');

// specific validator of company routes

exports.getDocuments = [
    check('id').isInt().withMessage("Should be an integer."),
    check('DocumentTypeId').optional({nullable: true}).isInt().withMessage("Should be an integer.")
];

exports.postDocuments = [
    check('id').isInt().withMessage("Should be an integer."),
    check('documents').isArray().isLength({min:1}).withMessage("Shoud be a list with at least 1 item."),
    check('documents.*.DocumentId').isInt().withMessage("Should be an integer.")
];