const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        res.send({
            data: await models.CompanyType.findAll({ where: { status: 1 } })
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}

exports.post = async (req, res) => {
    try {
        // get request body
        let campanyType = req.body;
        // set status active and create document
        campanyType.status = 1;
        res.status(201).send({ id: (await models.CompanyType.create(campanyType)).id });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await models.CompanyType.update({
            status: 0
        }, {
                where: {
                    id: id
                }
            })
        res.send({ id: deleted });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}

exports.put = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await models.CompanyType.update(req.body, {
                where: {
                    id: id
                }
            })
        res.send({ updated: updated[0] });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}

exports.getDocuments = async (req, res) => {
    try {
        const id = req.params.id;
        const filters = req.query;
        const documents = await models.Document.findAll({
            where: filters,
            include: [{
                model: models.DocumentToCompanyType,
                where: {
                    CompanyTypeId: id
                }
            }]
        });
        res.send({ data: documents });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}

exports.postDocuments = async (req, res) => {
    try {
        const documents = req.body.documents;
        // insrt each document in list
        for (document of documents) {
            // insert item if not exists
            await models.DocumentToCompanyType.findOrCreate({
                where: {
                    CompanyTypeId: req.params.id,
                    DocumentId: document.DocumentId
                },
                defaults: {
                    defaultValidity: document.defaultValidity
                }
            });
        }
        res.status(201).send({ msg: "Documents inserted" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}

exports.deleteDocuments = async (req, res) => {
    try {
        const deleted = await models.DocumentToCompanyType.destroy({
            where: {
                CompanyTypeId: req.params.id,
                DocumentId: req.params.DocumentId
            }
        });
        res.status(200).send({ deleted });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}

exports.updateDocuments = async (req, res) => {
    try {
        const updated = await models.DocumentToCompanyType.update({
            defaultValidity: req.body.defaultValidity
        }, {
                where: {
                    CompanyTypeId: req.params.id,
                    DocumentId: req.params.DocumentId
                }
            });
        res.status(200).send({ updated: updated[0] });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}