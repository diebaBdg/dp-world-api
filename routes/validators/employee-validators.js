const { check, validationResult } = require('express-validator/check');
const models = require('../../db/models');

// specific validator of company routes
exports.get = [
    check('CompanyId')
        .optional()
        .isInt()
        .withMessage("Deve ser um número inteiro."),
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

exports.patch = [
    check('id')
        .isNumeric()
        .withMessage("Deve ser numérico"),
    check('EmployeeStatusId')
        .isNumeric()
        .withMessage("Deve ser numérico")
];

exports.post = [
    check('name')
        .isLength({ min: 3, max: 50 })
        .withMessage("Deve ter entre 3 e 50 caracteres."),
    check('birthDate')
        .matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
        .withMessage("Deve ser uma data no formato YYYY-MM-DD."),
    check('cpf')
        .isNumeric()
        .withMessage("Deve ser um numérico de 11 caracteres.")
        .isLength({ min: 11, max: 11 })
        .withMessage("Deve ser um numérico de 11 caracteres.")
        .custom((cpf) => {
            return models.Employee.findOne({ where: { cpf: cpf } }).then(employee => {
                if (employee) {
                    return Promise.reject('CPF já em uso.');
                }
            });
        }),
    check('sector')
        .isLength({ min: 3, max: 50 })
        .withMessage("Deve ter entre 3 e 50 caracteres."),
    check('rg')
        .isAlphanumeric()
        .withMessage("Deve ser alfanumérico."),
    check('phone')
        .isNumeric()
        .isLength({ min: 10, max: 11 })
        .withMessage("Deve ter 10 ou 11 caracteres."),
    check('email')
        .isEmail()
        .withMessage("Deve ser um email válido")
        .custom((email) => {
            return models.Employee.findOne({ where: { email: email } }).then(employee => {
                if (employee) {
                    return Promise.reject('Email já em uso.');
                }
            });
        }),
    check('address')
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres."),
    check('number')
        .isLength({ min: 1, max: 20 })
        .withMessage("Deve ter entre 1 e 20 caracteres"),
    check('complement')
        .optional({ nullable: true })
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres."),
    check('district')
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres."),
    check('city')
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres."),
    check('state')
        .isLength({ min: 2, max: 2 })
        .withMessage("Should be 2 characters."),
    check('country')
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres."),
    check('cep')
        .optional({ nullable: true })
        .isNumeric()
        .isLength({ min: 8, max: 8 })
        .withMessage("Deve ter 8 caracteres"),
    check('CompanyId')
        .isInt()
        .withMessage("Deve ser um número inteiro."),
    check('FunctionId')
        .isInt()
        .withMessage("Deve ser um número inteiro.")
];

exports.postAttachment = [
    check('id')
        .isNumeric()
        .withMessage("Deve ser numérico"),
    check('DocumentId')
        .isNumeric()
        .withMessage("Deve ser numérico"),
];

exports.getAttachments = [
    check('id')
        .isNumeric()
        .withMessage("Deve ser numérico")
];

exports.getAttachmentFile = [
    check('id')
        .isNumeric()
        .withMessage("Deve ser numérico"),
    check('idAttachment')
        .isNumeric()
        .withMessage("Deve ser numérico")
]

exports.pathAttachment = [
    check('id')
        .isNumeric()
        .withMessage("Deve ser numérico"),
    check('idAttachment')
        .isNumeric()
        .withMessage("Deve ser numérico")
        .custom(idAttachment => {
            return models.EmployeeAttachment.findOne({ where: { id: idAttachment } })
                .then(attachment => {
                    if (attachment.AttachmentStatusId == 2 || attachment.AttachmentStatusId == 3 || attachment.AttachmentStatusId == 4) {
                        return Promise.reject('Não é possível alterar o status desse anexo.');
                    }
                });
        }),
    check('AttachmentStatusId')
        .isNumeric()
        .withMessage("Deve ser numérico"),
    check('note')
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage("Deve ter entre 3 e 50 caracteres."),
]