const { check, validationResult } = require('express-validator/check');
const models = require('../../db/models');
const Op = require('sequelize').Op;

// specific validator of company routes
exports.post = [
    check('description')
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres.")
        .custom(description => {
            return models.CompanyType.findOne({
                where: {
                    description,
                    status: 1
                }
            }).then(companyType => {
                if (companyType) {
                    return Promise.reject('Descrição já existe.');
                }
            });
        })
];

exports.delete = [
    check('id').isInt().withMessage("Deve ser um número inteiro.")
];

exports.put = [
    check('id')
        .isInt()
        .withMessage("Deve ser um número inteiro."),
    check('description')
        .custom((description, options) => {
            const id = options.req.params.id;
            return models.CompanyType.findOne({ 
                where: { 
                    description,
                    id: {
                        [Op.ne]: id
                    },
                    status: 1
                } 
            }).then(companyType => {
                if (companyType) {
                    return Promise.reject('Descrição já existe.');
                }
            });
        })
];

exports.getDocuments = [
    check('id').isInt().withMessage("Deve ser um número inteiro."),
    check('DocumentTypeId').optional({ nullable: true }).isInt().withMessage("Deve ser um número inteiro."),
    check('FunctionId').optional({ nullable: true }).isInt().withMessage("Deve ser um número inteiro.")
];

exports.postDocuments = [
    check('id').isInt().withMessage("Deve ser um número inteiro."),
    check('documents').isArray().isLength({ min: 1 }).withMessage("Deve ser uma lista com ao menos 1 item."),
    check('documents.*.DocumentId').isInt().withMessage("Deve ser um número inteiro."),
    check('documents.*.defaultValidity').optional({ nullable: true }).isAlphanumeric().withMessage("Deve ser alfanumérico")
];

exports.deleteDocuments = [
    check('id').isInt().withMessage("Deve ser um número inteiro."),
    check('DocumentId').isInt().withMessage("Deve ser um número inteiro.")
];

exports.updateDocuments = [
    check('id').isInt().withMessage("Deve ser um número inteiro."),
    check('DocumentId').isInt().withMessage("Deve ser um número inteiro."),
    check('defaultValidity').isAlphanumeric().withMessage("Deve ser alfanumérico")
];