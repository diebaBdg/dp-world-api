const { check, validationResult } = require('express-validator/check');
const models = require('../../db/models');
const Op = require('sequelize').Op;

// specific validator of company routes
exports.get = [
    check('status')
        .optional()
        .isInt({ min: 0, max: 1 })
        .withMessage("Deve ser 1 ou 0.")
];

exports.post = [
    check('name')
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres.")
        .custom((name) => {
            return models.Sector.findOne({
                where: {
                    name
                }
            }).then(sector => {
                if (sector) {
                    return Promise.reject('Já existe setor com esse nome.');
                }
            });
        }),
];

exports.put = [
    check('id')
        .isInt()
        .withMessage("Deve ser um número inteiro."),
    check('name')
        .optional()
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres.")
        .custom((name, options) => {
            const id = options.req.params.id;
            return models.Sector.findOne({
                where: {
                    name,
                    id: { [Op.ne]: id }
                }
            }).then(sector => {
                if (sector) {
                    return Promise.reject('Já existe setor com esse nome.');
                }
            });
        }),
    check('status')
        .optional()
        .isInt({ min: 0, max: 1 })
        .withMessage("Deve ser 1 ou 0.")
];

exports.delete = [
    check('id').isInt().withMessage("Deve ser um número inteiro.")
];

exports.getDocuments = [
    check('id').isInt().withMessage("Deve ser um número inteiro."),
    check('DocumentTypeId').optional({ nullable: true }).isInt().withMessage("Deve ser um número inteiro.")
];

exports.postDocuments = [
    check('id').isInt().withMessage("Deve ser um número inteiro."),
    check('documents').isArray().isLength({ min: 1 }).withMessage("Deve ser uma lista com ao menos 1 item"),
    check('documents.*.DocumentId').isInt().withMessage("Deve ser um número inteiro.")
];

exports.deleteDocuments = [
    check('id').isInt().withMessage("Deve ser um número inteiro."),
    check('DocumentId').isInt().withMessage("Deve ser um número inteiro.")
];