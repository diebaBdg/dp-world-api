const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        // validate if there are filter DocumentType
        const DocumentTypeId = req.query.DocumentTypeId;
        let include;
        if(DocumentTypeId){
            include = [{
                model: models.Document,
                where: {
                    DocumentTypeId: DocumentTypeId
                }
            }]
        }
        res.send({
            data: await models.Function.findAll({
                include
            })
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.post = async (req, res) => {
    try {
        const functions = await models.Function.findAll({ where: { description: req.body.description } });
        if (!functions.length) {
            res.status(201).send({id: (await models.Function.create({ description: req.body.description })).id});
        } else {
            res.status(400).send({ msg: "Item already exists." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}