const models = require('../db/models');
exports.get = async (req, res) => {
    try{
        res.send({
            documents: await models.Document.findAll()
        });
    }catch(err){
        console.log(err);
        res.status(500).send({msg: 'Internal Error'})
    }
}

exports.post = async (req, res) => {
    try{
        // get request body
        let document = req.body;
        // get documents and verify if exists document with the same name
        const documents = await models.Document.findAll({ where: { description: req.body.description } });
        if(!documents.length){
            // set status active and create
            document.status = 1
            res.status(201).send(await models.Document.create(document));
        }else{
            res.status(400).send({ msg: "Document already existis." });
        }
    }catch(err){
        console.log(err);
        res.status(500).send({msg: 'Internal Error'})
    }
}