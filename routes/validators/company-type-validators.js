const { check, validationResult } = require('express-validator/check');
const models = require('../../db/models');
const Op = require('sequelize').Op;

// specific validator of company routes
exports.post = [
    check('description')
        .isLength({ min: 3, max: 200 })
        .withMessage("Should be between 3 and 200 characters.")
        .custom(description => {
            return models.CompanyType.findOne({
                where: {
                    description,
                    status: 1
                }
            }).then(companyType => {
                if (companyType) {
                    return Promise.reject('Descrição já existe.');
                }
            });
        })
];

exports.delete = [
    check('id').isInt().withMessage("Should be an integer.")
];

exports.put = [
    check('id')
        .isInt()
        .withMessage("Should be an integer."),
    check('description')
        .custom((description, options) => {
            const id = options.req.params.id;
            return models.CompanyType.findOne({ 
                where: { 
                    description,
                    id: {
                        [Op.ne]: id
                    },
                    status: 1
                } 
            }).then(companyType => {
                if (companyType) {
                    return Promise.reject('Descrição já existe.');
                }
            });
        })
];

exports.getDocuments = [
    check('id').isInt().withMessage("Should be an integer."),
    check('DocumentTypeId').optional({ nullable: true }).isInt().withMessage("Should be an integer."),
    check('FunctionId').optional({ nullable: true }).isInt().withMessage("Should be an integer.")
];

exports.postDocuments = [
    check('id').isInt().withMessage("Should be an integer."),
    check('documents').isArray().isLength({ min: 1 }).withMessage("Shoud be a list with at least 1 item."),
    check('documents.*.DocumentId').isInt().withMessage("Should be an integer."),
    check('documents.*.defaultValidity').optional({ nullable: true }).isAlphanumeric().withMessage("Should be an date description.")
];

exports.deleteDocuments = [
    check('id').isInt().withMessage("Should be an integer."),
    check('DocumentId').isInt().withMessage("Should be an integer.")
];

exports.updateDocuments = [
    check('id').isInt().withMessage("Should be an integer."),
    check('DocumentId').isInt().withMessage("Should be an integer."),
    check('defaultValidity').isAlphanumeric().withMessage("Should be an alphanumeric.")
];