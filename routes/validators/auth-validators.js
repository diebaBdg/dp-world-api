const { check, validationResult } = require('express-validator/check');

exports.post = [
    //    check('email')
    //        .isEmail()
    //        .withMessage("Deve ser um email"),
    check('password')
        .isLength({ min: 3, max: 50 })
        .withMessage("Deve ter entre 3 e 50 caracteres.")
];

exports.postRequestChangePassword = [
    check('email')
        .isEmail()
        .withMessage("Deve ser um email")
];

exports.postRequestResetPassword = [
    check('email')
        .isEmail()
        .withMessage("Deve ser um email")
];

exports.putUserPassword = [
    check('password')
        .isLength({ min: 5, max: 20 })
        .withMessage("Deve ter entre 5 e 20 caracteres.")
];