const { check, validationResult } = require('express-validator/check');
const models = require('../../db/models');
const Op = require('sequelize').Op;

// specific validator of company routes
exports.get = [
    check('DocumentTypeId').optional({ nullable: true }).isInt().withMessage("Deve ser um número inteiro."),
    check('FunctionId').optional({ nullable: true }).isInt().withMessage("Deve ser um número inteiro."),
    check('status').optional({ nullable: true }).isInt().withMessage("Deve ser um número inteiro.")
];

exports.post = [
    check('description')
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres.")
        .custom((description) => {
            return models.Document.findOne({
                where: {
                    description
                }
            }).then(document => {
                if (document) {
                    return Promise.reject('Já existe documento com essa descrição.');
                }
            });
        }),
    check('DocumentTypeId')
        .isInt()
        .withMessage("Deve ser um número inteiro."),
    check('FunctionId')
        .optional({ nullable: true })
        .isInt()
        .withMessage("Deve ser um número inteiro.")
];

exports.put = [
    check('id')
        .isInt()
        .withMessage("Deve ser um inteiro."),
    check('description')
        .optional()
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres.")
        // verify if description already exists
        .custom((description, options) => {
            const id = options.req.params.id;
            return models.Document.findOne({
                where: {
                    description: description,
                    id: { [Op.ne]: id }
                }
            }).then(document => {
                if (document) {
                    return Promise.reject('Já existe documento com essa descrição.');
                }
            });
        }),
    check('DocumentTypeId')
        .optional()
        .isInt()
        .withMessage("Deve ser um número inteiro."),
    check('status')
        .optional()
        .isInt({ min: 0, max: 1 })
        .withMessage("Deve ser 1 ou 0."),
    check('FunctionId')
        .optional({ nullable: true })
        .isInt()
        .withMessage("Deve ser um número inteiro.")
];


exports.delete = [
    check('id')
        .isInt()
        .withMessage("Deve ser um inteiro.")
        .custom(id => {
            return models.Document.findOne({
                where: {
                    id: id
                }
            }).then(document => {
                if (!document) {
                    return Promise.reject('Documento não existe.');
                }
            });
        })
];