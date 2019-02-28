const models = require('../db/models');

exports.get = async (req, res) => {
    res.send({
        companies: await models.Empresa.findAll()
    });
}

exports.post = async (req, res) => {
    let result = await models.Empresa.create({cnpj: '33333333333333'});
    res.send(result);
}