const { check, validationResult } = require('express-validator/check');
const models = require('../../db/models');
const Op = require('sequelize').Op;

// specific validator of company routes
exports.get = [
    check('status')
        .optional()
        .isInt({ min: 0, max: 1 }),
    check('page')
        .optional()
        .isInt({ min: 1})
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

exports.post = [
    check('description')
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres.")
        .custom(description => {
            return models.CompanyType.findOne({
                where: {
                    description
                }
            }).then(companyType => {
                if (companyType) {
                    return Promise.reject('Descrição já existe.');
                }
            });
        })
];

exports.delete = [
    check('id')
        .isInt()
        .withMessage("Deve ser um número inteiro.")
        .custom((id) => {
            return models.CompanyType.findOne({
                where: {
                    id: id
                }
            }).then(companyType => {
                if (!companyType) {
                    return Promise.reject('Tipo de empresa já excluído.');
                }
            });
        })

];

exports.put = [
    check('id')
        .isInt()
        .withMessage("Deve ser um número inteiro."),
    check('description')
        .optional()
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres.")
        .custom((description, options) => {
            const id = options.req.params.id;
            return models.CompanyType.findOne({
                where: {
                    description,
                    id: {
                        [Op.ne]: id
                    }
                }
            }).then(companyType => {
                if (companyType) {
                    return Promise.reject('Descrição já existe.');
                }
            });
        }),
    check('status')
        .optional()
        .isInt({ min: 0, max: 1 })
        .withMessage("Deve ser um número inteiro."),
];

exports.getDocuments = [
    check('id').isInt().withMessage("Deve ser um número inteiro."),
    check('DocumentTypeId').optional({ nullable: true }).isInt().withMessage("Deve ser um número inteiro."),
    check('FunctionId').optional({ nullable: true }).isInt().withMessage("Deve ser um número inteiro."),
    check('isperiodic').optional({ nullable: true }).isIn(['false']).withMessage("Deve ser false se informado.")
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