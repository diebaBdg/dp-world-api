const { check, validationResult } = require('express-validator/check');

// specific validator of company routes
exports.post = [
    check('description').isLength({min:3, max: 200}).withMessage("Shoud be between 3 and 200 characters.")
];