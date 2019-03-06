const models = require('../db/models');
const { check, validationResult } = require('express-validator/check');

exports.post = async (req, res) => {
    try{
        let result = await models.Document.create({ description: 'Documento Teste', status: 1, DocumentTypeId: 5 });
        res.send(result);
    }catch(err){
        res.status(500).send({msg: 'Internal Error'})
    }
}