const { check, validationResult } = require('express-validator/check');
const moment = require('moment');
const models = require('../../db/models');

exports.get = [
    check('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage("Deve ser um inteiro maior ou igual a 1."),
    check('order_by')
        .optional()
        .isLength({ min: 1, max: 200 })
        .withMessage("Deve ter entre 1 e 200 caracteres."),
    check('order_direction')
        .optional()
        .isIn(['ASC', 'DESC'])
        .withMessage("Deve ser ASC ou DESC."),
    check('occurrence')
        .optional()
        .isIn(['PAST', 'past', 'FUTURE', 'future'])
        .withMessage("Deve ser PAST ou FUTURE.")
];

exports.post = [
    check('date')
        .matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/)
        .withMessage("Deve ser uma data com hora no formato YYYY-MM-DD HH:MM:SS.")
        .custom(date => {
            return moment(date).isValid()
        })
        .withMessage("Deve ser uma data com valores válidos.")
        .custom(date => {
            const now = moment();
            const dateMoment = moment(date);
            return now.isBefore(dateMoment, 'day')
        })
        .withMessage("A data deve ser ao menos 1 dia após a data atual."),
    check('vacancies')
        .isInt({ min: 1 })
        .withMessage("Deve ser um inteiro maior ou igual a 1."),
    check('instructor')
        .isLength({ min: 1, max: 200 })
        .withMessage("Deve ter entre 1 e 200 caracteres."),
    check('note')
        .optional({ nullable: true })
        .isLength({ min: 1, max: 200 })
        .withMessage("Deve ter entre 1 e 200 caracteres."),
    check('instructors')
        .isArray({ min: 3})
        .withMessage("Deve ser um array.")
];

exports.delete = [
    check('id')
        .isInt()
        .withMessage("Deve ser um número inteiro.")
        .custom((id) => {
            return models.Integration.findOne({
                where: {
                    id
                }
            }).then(integration => {
                if (!integration) {
                    return Promise.reject('Integração não existe.');
                }
            });
        })
];

exports.put = [
    check('id')
        .isInt()
        .withMessage("Deve ser um número inteiro.")
        .custom((id) => {
            return models.Integration.findOne({
                where: {
                    id
                }
            }).then(integration => {
                if (!integration) {
                    return Promise.reject('Integração não existe.');
                }
            });
        }),
    check('date')
        .optional()
        .matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/)
        .withMessage("Deve ser uma data com hora no formato YYYY-MM-DD HH:MM:SS.")
        .custom(date => {
            return moment(date).isValid()
        })
        .withMessage("Deve ser uma data com valores válidos.")
        .custom(date => {
            const now = moment();
            const dateMoment = moment(date);
            return now.isBefore(dateMoment, 'day')
        })
        .withMessage("A data deve ser ao menos 1 dia após a data atual."),
    check('vacancies')
        .optional()
        .isInt({ min: 1 })
        .withMessage("Deve ser um inteiro maior ou igual a 1."),
    check('instructor')
        .optional()
        .isLength({ min: 1, max: 200 })
        .withMessage("Deve ter entre 1 e 200 caracteres."),
    check('note')
        .optional({ nullable: true })
        .isLength({ min: 1, max: 200 })
        .withMessage("Deve ter entre 1 e 200 caracteres.")
];

exports.close = [
    check('id')
        .isInt()
        .withMessage("Deve ser um número inteiro.")
        .custom((id) => {
            return models.Integration.findOne({
                where: {
                    id
                }
            }).then(integration => {
                if (!integration) {
                    return Promise.reject('Integração não existe.');
                }
            });
        }),
];