const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        // pagination definition
        const limit = 10;
        let offset = undefined;
        if (req.query.page) {
            offset = limit * (req.query.page - 1);
        }
        // order definiton
        let order = [];
        if (req.query.order_by) {
            order.push([
                req.query.order_by,
                req.query.order_direction ? req.query.order_direction : 'ASC'
            ]);
        }
        // filter definition
        let filter = {};
        if (req.query.status !== undefined) {
            filter.status = req.query.status
        }
        // validate if there are filter DocumentType
        let include = [];
        if (req.query.DocumentTypeId) {
            include.push({
                model: models.Document,
                where: {
                    DocumentTypeId: req.query.DocumentTypeId
                }
            });
        }
        // get objects
        const data = await models.Function.findAndCountAll({
            where: filter,
            include,
            order,
            limit,
            offset
        })
        res.send(data);
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
        const updated = await models.Function.update(req.body, {
            where: { id: req.params.id }
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

exports.delete = async (req, res) => {
    try {
        const deleted = await models.Function.destroy({
            where: { id: req.params.id }
        })
        res.send({
            deleted,
            msg: "Excluído com sucesso."
        });
    } catch (err) {
        if (err.name == 'SequelizeForeignKeyConstraintError') {
            res.status(400).send({ msg: 'A função não pode ser excluída pois está sendo utilizada.' });
        } else {
            console.log(err);
            res.status(500).send({ msg: 'Internal Error' });
        }
    }
}