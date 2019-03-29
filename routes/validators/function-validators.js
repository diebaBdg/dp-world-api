const { check, validationResult } = require('express-validator/check');
const models = require('../../db/models');
const Op = require('sequelize').Op;

// specific validator of company routes

exports.get = [
    check('DocumentTypeId')
        .optional()
        .isInt()
        .withMessage("Deve ser um número inteiro."),
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
            return models.Function.findOne({
                where: {
                    description
                }
            }).then(func => {
                if (func) {
                    return Promise.reject('Já existe função com essa descrição.');
                }
            });
        })
];

exports.put = [
    check('description')
        .optional()
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres.")
        .custom((description, options) => {
            const id = options.req.params.id;
            return models.Function.findOne({
                where: {
                    description,
                    id: { [Op.ne]: id }
                }
            }).then(func => {
                if (func) {
                    return Promise.reject('Já existe função com essa descrição.');
                }
            });
        }),
    check('status')
        .optional()
        .isInt({ min: 0, max: 1 })
        .withMessage("Deve ser 1 ou 0.")
];