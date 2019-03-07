const models = require('../db/models');
exports.get = async (req, res) => {
    try{
        res.send({
            documents: await models.Document.findAll()
        });
    }catch(err){
        res.status(500).send({msg: 'Internal Error'})
    }
}

exports.post = async (req, res) => {
    try{
        const result = await models.Document.create({ description: 'Documento Teste', status: 1, DocumentTypeId: 5 });
        res.send(result);
    }catch(err){
        res.status(500).send({msg: 'Internal Error'})
    }
}