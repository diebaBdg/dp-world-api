const { check, validationResult } = require('express-validator/check');

// specific validator of company routes

exports.getDocuments = [
    check('DocumentTypeId').optional({nullable: true}).isInt().withMessage("Should be an integer.")
];
