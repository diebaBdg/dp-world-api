const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        // validate if there are filter DocumentType
        let include = [];
        if (req.query.DocumentTypeId) {
            include.push({
                model: models.Document,
                where: {
                    DocumentTypeId: req.query.DocumentTypeId
                }
            })
        }
        res.send({
            data: await models.Function.findAll({
                where: req.query,
                include,
                order: [
                    ['id', 'DESC']
                ]
            })
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.post = async (req, res) => {
    try {
        let func = req.body;
        res.status(201).send({ 
            id: (await models.Function.create(func)).id,
            msg: "Cadastrado com sucesso."
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}

exports.put = async (req, res) => {
    try {
        const updated = await models.Function.update(req.body,{
            where: {id: req.params.id}
        })
        res.send({ 
            updated: updated[0],
            msg: "Alterado com sucesso."
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}