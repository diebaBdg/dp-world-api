const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        // select filters
        let filters = req.query;
        filters.status = 1;
        // execute query and send data
        res.send({
            data: await models.Document.findAll({ where: filters })
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.post = async (req, res) => {
    try {
        // get request body
        let document = req.body;
        document.status = 1;
        res.status(201).send({ id: (await models.Document.create(document)).id });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.put = async (req, res) => {
    try {
        const updated = await models.Document.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.send({ updated: updated[0]});
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.delete = async (req, res) => {
    try {
        const deleted = await models.Document.update({
            status: 0
        },{
            where: {
                id: req.params.id
            }
        });
        res.send({ deleted: deleted[0]});
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}