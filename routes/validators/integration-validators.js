const { check, validationResult } = require('express-validator/check');
const moment = require('moment');

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
        .withMessage("Deve ser ASC ou DESC.")
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
            return now.isBefore(dateMoment,'day')
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
        .withMessage("Deve ter entre 1 e 200 caracteres.")
];