const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        res.send({
            data: await models.DocumentType.findAll({
                where: req.query,
                order: [
                    ['id', 'DESC']
                ]
            })
        });
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