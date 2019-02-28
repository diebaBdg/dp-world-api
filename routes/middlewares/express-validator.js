const { check, validationResult } = require('express-validator/check');

// this middleware valid the result of validations difined to the route
exports.findsValidatorErros = () => {
    return (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            next();
        }
    }
}
