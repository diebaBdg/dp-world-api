const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        res.send({
            functions: await models.Function.findAll()
        });
    } catch (err) {
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.post = async (req, res) => {
    try {
        const functions = await models.Function.findAll({ where: { description: req.body.description } });
        if (!functions.length) {
            res.status(201).send({id: (await models.Function.create({ description: req.body.description })).id});
        } else {
            res.status(400).send({ msg: "Function already existis." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}