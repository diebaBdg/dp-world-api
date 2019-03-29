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
        const functions = await models.Function.findAll({ where: { description: req.body.description } });
        if (!functions.length) {
            res.status(201).send({ id: (await models.Function.create({ description: req.body.description })).id });
        } else {
            res.status(400).send({ msg: "Função já em uso." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}