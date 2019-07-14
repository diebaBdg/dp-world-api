const models = require('../db/models');
const Paginator = require('../helpers/paginator-helper');
const orderHerper = require('../helpers/order-helper');
const Op = require('sequelize').Op;

exports.get = async (req, res) => {
    try {
        const paginator = new Paginator(req.query.page);
        let filter = {};
        if (req.query.status !== undefined) {
            filter.status = req.query.status
        }
        let data = await models.CompanyType.findAndCountAll({
            where: filter,
            order: orderHerper.getOrder(req.query.order_by, req.query.order_direction),
            limit: paginator.limit,
            offset: paginator.offset
        });
        data.pages = paginator.getNumberOfPages(data.count);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}

exports.post = async (req, res) => {
    try {
        let campanyType = req.body;
        campanyType.status = 1;
        res.status(201).send({
            id: (await models.CompanyType.create(campanyType)).id,
            msg: "Cadastrado com sucesso."
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}

exports.delete = async (req, res) => {
    try {
        const deleted = await models.CompanyType.destroy({
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
            res.status(400).send({ msg: 'O tipo de empresa não pode ser excluído pois está sendo utilizado.' });
        } else {
            console.log(err);
            res.status(500).send({ msg: 'Internal Error' });
        }
    }
}

exports.put = async (req, res) => {
    try {
        const updated = await models.CompanyType.update(req.body, {
            where: {
                id: req.params.id
            }
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

exports.getDocuments = async (req, res) => {
    try {
        const id = req.params.id;
        const filters = {}
        if(req.query.DocumentTypeId){
            filters.DocumentTypeId = req.query.DocumentTypeId;
        }
        if(req.query.FunctionId){
            filters.FunctionId = req.query.FunctionId;
        }
        const filters2 = {
            CompanyTypeId: id
        }
        if(req.query.isperiodic == 'false'){
            filters2.defaultValidity = null;
        }
        const documents = await models.Document.findAll({
            where: filters,
            include: [{
                model: models.DocumentToCompanyType,
                where: filters2
            }]
        });
        res.send({ data: documents });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}

let notifyCompanies = async (companies, document) => {
    for (company of companies) {
        company.CompanyStatusId = 2;
        const contacts = await company.getUsers({ where: { UserTypeId: 2 } });
        const notifications = contacts.map(user => {
            return models.Notification.build({
                UserId: user.id,
                message: `Olá ${user.name},<br>O documento ${document.name} agora é necessário para o seu tipo de empresa, acesse o sistema para anexa-lo.<br><br> `
            })
        });
        for (notification of notifications) {
            await notification.sendEmail();
            await notification.save();
        }
        company.save();
    }
}

exports.postDocuments = async (req, res) => {
    try {
        const documents = req.body.documents;
        // insrt each document in list
        for (document of documents) {
            // insert item if not exists
            const documentToCompanyType = await models.DocumentToCompanyType.findOrCreate({
                where: {
                    CompanyTypeId: req.params.id,
                    DocumentId: document.DocumentId
                },
                defaults: {
                    defaultValidity: document.defaultValidity
                }
            });
            console.log('NEW RECORD', documentToCompanyType[0].isNewRecord);
            // notify companies about new document
            const companies = await models.Company.findAll({
                where:{
                    CompanyTypeId: req.params.id,
                    CompanyStatusId: {
                        [Op.ne]: 6
                    }
                }
            })
            await notifyCompanies(companies, document);
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