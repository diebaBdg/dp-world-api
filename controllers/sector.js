const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        res.send({
            data: await models.Sector.findAll({
                where: {status: 1}
            })
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
                where:{
                    DocumentTypeId: documentTypeId
                }
            }],
        });
        // prepare and sending response
        const documents = area[0]?area[0].Documents:[];
        res.send({
            data: documents
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}
