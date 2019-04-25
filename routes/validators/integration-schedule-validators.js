const { check, validationResult } = require('express-validator/check');
const models = require('../../db/models');

// specific validator of company routes

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
    check('IntegrationId')
        .isInt()
        .withMessage("Deve ser um número inteiro.")
        .custom((IntegrationId) => {
            return models.Integration.findOne({
                where: {
                    id: IntegrationId
                }
            }).then(integration => {
                if (!integration) {
                    return Promise.reject('Integração não existe.');
                }
            });
        }),
    check('EmployeeId')
        .isInt()
        .withMessage("Deve ser um número inteiro.")
        .custom((EmployeeId) => {
            return models.Employee.findOne({
                where: {
                    id: EmployeeId
                }
            }).then(schedule => {
                if (!schedule) {
                    return Promise.reject('Funcionário não existe.');
                }
            });
        })
];

exports.delete = [
    check('id')
        .isInt()
        .withMessage("Deve ser um número inteiro.")
        .custom((id) => {
            return models.IntegrationSchedule.findOne({
                where: {
                    id
                }
            }).then(schedule => {
                if (!schedule) {
                    return Promise.reject('Agendamento não existe.');
                }
            });
        })
];