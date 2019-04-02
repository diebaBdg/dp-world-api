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
        if (req.query.DocumentTypeId !== undefined) {
            filter.DocumentTypeId = req.query.DocumentTypeId
        }
        if (req.query.FunctionId !== undefined) {
            filter.FunctionId = req.query.FunctionId
        }
        // get objects
        const data = await models.Document.findAndCountAll({
            where: filter,
            include: [{
                model: models.Function
            }, {
                model: models.DocumentType
            }],
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
        // get request body
        let document = req.body;
        document.status = 1;
        res.status(201).send({
            id: (await models.Document.create(document)).id,
            msg: "Cadastrado com sucesso."
        });
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
        res.send({
            updated: updated[0],
            msg: "Alterado com sucesso."
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.delete = async (req, res) => {
    try {
        // verify if it is used by companytypes
        if (await models.DocumentToCompanyType.findOne({ where: { DocumentId: req.params.id } })) {
            res.status(400).send({ msg: 'Não é possível deletar o documento pois ele está associado a um tipo de empresa.' })
            return
        }
        // verify if it is used by sectors
        const document = await models.Document.findOne({ where: { id: req.params.id } });
        if ((await document.getSectors()).length) {
            res.status(400).send({ msg: 'Não é possível deletar o documento pois ele está associado a um setor.' })
            return
        }
        const deleted = await models.Document.destroy({
            where: {
                id: req.params.id
            }
        });
        res.send({
            deleted: deleted,
            msg: "Excluído com sucesso"
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}