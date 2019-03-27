const { check, validationResult } = require('express-validator/check');

// specific validator of company routes

exports.getDocuments = [
    check('id').isInt().withMessage("Deve ser um número inteiro."),
    check('DocumentTypeId').optional({nullable: true}).isInt().withMessage("Deve ser um número inteiro.")
];

exports.postDocuments = [
    check('id').isInt().withMessage("Deve ser um número inteiro."),
    check('documents').isArray().isLength({min:1}).withMessage("Deve ser uma lista com ao menos 1 item"),
    check('documents.*.DocumentId').isInt().withMessage("Deve ser um número inteiro.")
];

exports.deleteDocuments = [
    check('id').isInt().withMessage("Deve ser um número inteiro."),
    check('DocumentId').isInt().withMessage("Deve ser um número inteiro.")
];