const models = require('../db/models');
const { check, validationResult } = require('express-validator/check');

exports.get = async (req, res) => {
    console.log(2);
    res.send({
        companies: await models.Empresa.findAll()
    });
}

exports.post = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let result = await models.Empresa.create({ cnpj: '33333333333333' });
    res.send(result);
}