const { check, validationResult } = require('express-validator/check');

// specific validator of company routes
exports.post = [
    check('email')
        .isEmail()
        .withMessage("Should be a email"),
    check('password')
        .isLength({min:3, max: 50})
        .withMessage("Should be between 3 and 50 characters.")
];