const { check, validationResult } = require('express-validator/check');
const models = require('../../db/models');
const Op = require('sequelize').Op;

exports.get = [
    check('status')
        .optional()
        .isInt({ min: 0, max: 1 })
        .withMessage("Deve ser 1 ou 0.")
];

exports.post = [
    check('description')
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres.")
        .custom(description => {
            return models.DocumentType.findOne({
                where: {
                    description
                }
            }).then(documentType => {
                if (documentType) {
                    return Promise.reject('Já existe um tipo de documento com essa descrição.');
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
            return models.DocumentType.findOne({
                where: {
                    description,
                    id: {
                        [Op.ne]: id
                    }
                }
            }).then(documentType => {
                if (documentType) {
                    return Promise.reject('Descrição já existe.');
                }
            });
        }),
    check('status')
        .optional()
        .isInt({ min: 0, max: 1 })
        .withMessage("Deve ser 1 ou 0.")
];

exports.delete = [
    check('id')
        .isInt()
        .withMessage("Deve ser um número inteiro.")
        .custom((id) => {
            return models.DocumentType.findOne({
                where: {
                    id: id
                }
            }).then(documentType => {
                if (!documentType) {
                    return Promise.reject('Tipo de documento já excluído.');
                }
            });
        })
];