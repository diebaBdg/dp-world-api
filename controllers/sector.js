const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        res.send({
            data: await models.Sector.findAll()
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
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
        res.send({ msg: "associated" });
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