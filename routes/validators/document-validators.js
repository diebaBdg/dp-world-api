const { check, validationResult } = require('express-validator/check');
const models = require('../../db/models');

// specific validator of company routes
exports.get = [
    check('DocumentTypeId').optional({nullable: true}).isInt().withMessage("Should be an integer."),
    check('FunctionId').optional({nullable: true}).isInt().withMessage("Should be an integer.")
];

exports.post = [
    check('description')
        .isLength({min:3, max: 200})
        .withMessage("Should be between 3 and 200 characters.")
        .custom((description)=>{
            return models.Document.findOne({ where: { description: description } }).then(document => {
                if (document) {
                    return Promise.reject('Já existe documento com essa descrição.');
                }
            });
        }),
    check('DocumentTypeId')
        .isInt()
        .withMessage("Should be an integer."),
    check('FunctionId')
        .optional({nullable: true})
        .isInt()
        .withMessage("Should be an integer.")
];