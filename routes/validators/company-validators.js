const { check, validationResult } = require('express-validator/check');
const models = require('../../db/models');

// specific validator of company routes
let defaultCompany = [
    check('cnpj')
        .isNumeric()
        .withMessage("Deve ser um numérico de 14 caracteres.")
        .isLength({ min: 14, max: 14 })
        .withMessage("Deve ser um numérico de 14 caracteres.")
        .custom((cnpj) => {
            return models.Company.findOne({ where: { cnpj: cnpj } }).then(company => {
                if (company) {
                    return Promise.reject('CNPJ já em uso.');
                }
            });
        }),
    check('socialName')
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres.")
        .custom((socialName) => {
            return models.Company.findOne({ where: { socialName: socialName } }).then(company => {
                if (company) {
                    return Promise.reject('Razão social já em uso.');
                }
            });
        }),
    check('businessName')
        .optional({ nullable: true })
        .isLength({ min: 3, max: 200 }).withMessage("Deve ter entre 3 e 200 caracteres.")
        .custom((businessName) => {
            return models.Company.findOne({ where: { businessName: businessName } }).then(company => {
                if (company) {
                    return Promise.reject('Nome fantasia já em uso.');
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
    check('phone')
        .isNumeric()
        .isLength({ min: 10, max: 11 })
        .withMessage("Should be between 10 or 11 characters."),
    check('inscricaoEstadual')
        .optional({ nullable: true })
        .isLength({ min: 3, max: 200 })
        .withMessage("Deve ter entre 3 e 200 caracteres."),
    check('site')
        .optional({ nullable: true })
        .isURL()
        .withMessage("Deve ser uma URL."),
    check('CompanyTypeId')
        .isNumeric()
        .withMessage("Deve ser numérico"),
    check('CompanyId')
        .optional({ nullable: true })
        .isNumeric(),
    check('objectOfContract')
        .isLength({ min: 1, max: 200 })
        .withMessage("Deve ter entre 1 e 200 caracteres.")
];

exports.get = [
    check('cnpj')
        .optional({ nullable: true })
        .isNumeric()
        .isLength({ min: 14, max: 14 })
        .withMessage("Deve ter 14 caracteres numéricos."),
    check('socialName')
        .optional({ nullable: true })
        .isLength({ min: 1, max: 200 })
        .withMessage("Deve ter entre 1 e 200 caracteres."),
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

exports.post = defaultCompany;

exports.patch = [
    check('id')
        .isNumeric()
        .withMessage("Deve ser numérico"),
    check('SectorId')
        .isNumeric()
        .withMessage("Deve ser numérico"),
    check('CompanyStatusId')
        .isNumeric()
        .withMessage("Deve ser numérico")
        .custom((CompanyStatusId, options) => {
            const id = options.req.params.id;
            return models.Company.findOne({ where: { id } }).then(company => {
                if ((company.CompanyStatusId != CompanyStatusId + 1) && (company.CompanyStatusId != CompanyStatusId - 1)) {
                    return Promise.reject('O status deve avançar ou regredir um valor.');
                }
            });
        })
];

exports.getContacts = [
    check('id')
        .isNumeric()
        .withMessage("Deve ser numérico")
]

exports.postContacts = [
    check('id')
        .isNumeric()
        .withMessage("Deve ser numérico"),
    check('email')
        .isEmail()
        .withMessage("Deve ser um email válido")
        .custom((email) => {
            return models.User.findOne({ where: { email: email } }).then(user => {
                if (user) {
                    return Promise.reject('Email já em uso.');
                }
            });
        }),
    check('name')
        .isLength({ min: 3, max: 50 })
        .withMessage("Deve ter entre 3 e 50 caracteres."),
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
        .withMessage("Deve ser numérico"),
    check('AttachmentStatusId')
        .isNumeric()
        .withMessage("Deve ser numérico")
]