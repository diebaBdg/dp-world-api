const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        res.send({
            data: await models.Sector.findAll({
                where: req.query,
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
        let sector = req.body;
        sector.status = 1;
        res.send({
            id: (await models.Sector.create(sector)).id,
            msg: "Cadastrado com sucesso."
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.put = async (req, res) => {
    try {
        const updated = await models.Sector.update(req.body,{
            where: {id: req.params.id} 
        }) 
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
        const deleted = await models.Sector.destroy({
            where: {id: req.params.id} 
        }) 
        res.send({
            deleted: deleted,
            msg: "Excluído com sucesso."
        });
    } catch (err) {
        if (err.name == 'SequelizeForeignKeyConstraintError') {
            res.status(400).send({ msg: 'O setor não pode ser excluído pois está sendo utilizado.'});
        } else {
            console.log(err);
            res.status(500).send({ msg: 'Internal Error'});
        }
    }
}

exports.getDocuments = async (req, res) => {
    try {
        // get filters
        const sectorId = req.params.id;
        const documentTypeId = req.query.DocumentTypeId;
        // difine query
        const area = await models.Sector.findAll({
            where: {
                id: sectorId
            },
            include: [{
                model: models.Document,
                through: {
                    where: {
                        SectorId: sectorId
                    }
                },
                where: {
                    DocumentTypeId: documentTypeId
                }
            }],
        });
        // prepare and sending response
        const documents = area[0] ? area[0].Documents : [];
        res.send({
            data: documents
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error', err })
    }
}


exports.postDocuments = async (req, res) => {
    try {
        const sectiorId = req.params.id;
        const idsDocuments = req.body.documents.map(item => item.DocumentId);
        //get sector and documents
        let sector = await models.Sector.findOne({ where: { id: sectiorId } });
        let documents = await models.Document.findAll({ where: { id: idsDocuments } });
        // associate setor to documents
        await sector.addDocuments(documents);
        res.send({ msg: "Documentos associados." });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.deleteDocuments = async (req, res) => {
    try {
        const sector = await models.Sector.findOne({ where: { id: req.params.id } });
        const document = await models.Document.findOne({ where: { id: req.params.DocumentId } });
        const removed = await sector.removeDocument(document);
        res.send({ deleted: removed });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}