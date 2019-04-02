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
        // get objects
        const data = await models.DocumentType.findAndCountAll({
            where: filter,
            order,
            limit,
            offset
        })
        res.send(data);
    } catch (err) {
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.post = async (req, res) => {
    try {
        res.status(201).send({ 
            id: (await models.DocumentType.create(req.body)).id,
            msg: "Cadastrado com sucesso."
        });
    } catch (err) {
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.put = async (req, res) => {
    try {
        const updated = await models.DocumentType.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.send({
            updated: updated[0],
            msg: "Alterado com sucesso."
        });
    } catch (err) {
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.delete = async (req, res) => {
    try {
        const deleted = await models.DocumentType.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({
            deleted: deleted,
            msg: "Excluído com sucesso."
        });
    } catch (err) {
        if (err.name == 'SequelizeForeignKeyConstraintError') {
            res.status(400).send({ msg: 'O tipo de documento não pode ser excluído pois está sendo utilizado.'});
        } else {
            console.log(err);
            res.status(500).send({ msg: 'Internal Error'});
        }
    }
}