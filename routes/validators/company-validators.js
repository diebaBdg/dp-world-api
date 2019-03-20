const { check, validationResult } = require('express-validator/check');

// specific validator of company routes
let defaultCompany = [
    check('cnpj')
        .isNumeric()
        .isLength({ min: 14, max: 14 })
        .withMessage("Should be 14 caracters numerics."),
    check('socialName')
        .isLength({ min: 3, max: 200 })
        .withMessage("Should be between 3 and 200 characters."),
    check('contactEmail')
        .isEmail()
        .withMessage("Should be an email."),
    check('contactName').isEmail()
        .isLength({ min: 3, max: 200 })
        .withMessage("Should be between 3 and 200 characters."),
    check('businessName')
        .optional({ nullable: true })
        .isLength({ min: 3, max: 200 }).withMessage("Should be between 3 and 200 characters."),
    check('address')
        .isLength({ min: 3, max: 200 })
        .withMessage("Should be between 3 and 200 characters."),
    check('number')
        .isLength({ min: 1, max: 20 })
        .withMessage("Should be between 1 and 20 characters."),
    check('complement')
        .optional({ nullable: true })
        .isLength({ min: 3, max: 200 })
        .withMessage("Should be between 3 and 200 characters."),
    check('district')
        .isLength({ min: 3, max: 200 })
        .withMessage("Should be between 3 and 200 characters."),
    check('city')
        .isLength({ min: 3, max: 200 })
        .withMessage("Should be between 3 and 200 characters."),
    check('state')
        .isLength({ min: 2, max: 2 })
        .withMessage("Should be 2 characters."),
    check('country')
        .isLength({ min: 3, max: 200 })
        .withMessage("Should be between 3 and 200 characters."),
    check('cep')
        .isNumeric()
        .isLength({ min: 8, max: 8 })
        .withMessage("Should be 8 characters."),
    check('phone')
        .isNumeric()
        .isLength({ min: 10, max: 11 })
        .withMessage("Should be between 10 or 11 characters."),
    check('inscricaoEstadual')
        .isLength({ min: 3, max: 200 })
        .withMessage("Should be between 3 and 200 characters."),
    check('site')
        .optional({ nullable: true })
        .isURL(),
    check('CompanyTypeId')
        .isNumeric()
        .withMessage("Should be numeric."),
    check('CompanyId')
        .optional({ nullable: true })
        .isNumeric()
];

exports.post = defaultCompany;

exports.put = [
    check('id')
        .isNumeric()
        .withMessage("Should be numeric."),
    check('SectorId')
        .isNumeric()
        .withMessage("Should be numeric."),
    check('CompanyStatusId')
        .isNumeric()
        .withMessage("Should be numeric.")
];