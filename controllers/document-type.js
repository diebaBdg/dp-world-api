const models = require('../db/models');
const Paginator = require('../helpers/paginator-helper');
const orderHerper = require('../helpers/order-helper');

exports.get = async (req, res) => {
    try {
        const paginator = new Paginator(req.query.page);
        // filter definition
        let filter = {};
        if (req.query.status !== undefined) {
            filter.status = req.query.status
        }
        // get objects
        let data = await models.DocumentType.findAndCountAll({
            where: filter,
            order: orderHerper.getOrder(req.query.order_by, req.query.order_direction),
            limit: paginator.limit,
            offset: paginator.offset
        })
        data.pages = paginator.getNumberOfPages(data.count);
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