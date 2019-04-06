const models = require('../db/models');
const Op = require('sequelize').Op;
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
        if (req.query.cnpj !== undefined) {
            filter.cnpj = req.query.cnpj
        }
        if (req.query.socialName !== undefined) {
            filter.socialName = {
                [Op.like]: req.query.socialName + '%'
            }
        }
        // get objects
        let data = await models.Company.findAndCountAll({
            where: filter,
            include: [{
                model: models.CompanyStatus,
                attributes: ['id', 'description']
            }, {
                model: models.CompanyType,
                attributes: ['id', 'description']
            }],
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
        // get request body
        let company = req.body;
        company.CompanyStatusId = 1;
        const companyCreated = await models.Company.create(company);
        res.status(201).send({
            id: companyCreated.id
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error', err })
    }
}

exports.patch = async (req, res) => {
    try {
        const companyStatusId = req.body.CompanyStatusId;
        const company = await models.Company.findOne({ where: { id: req.params.id } });

        if (companyStatusId == 2) {
            const contacts = await company.getUsers();
            for (contact of contacts) {
                await contact.enableAndSendEmail();
            }
        }

        await company.update({
            SectorId: req.body.SectorId,
            CompanyStatusId: companyStatusId
        });
        res.status(200).send({ 
            updated: 1,
            msg: "Atualizado com sucesso."
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.getContacts = async (req, res) => {
    try {
        const data = await models.User.findAndCountAll({
            attributes: ['id', 'name', 'email', 'phone', 'phone2'],
            where: {
                CompanyId: req.params.id
            },
            order: [
                ['id', 'DESC']
            ]
        });
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error', err })
    }
}

exports.postContacts = async (req, res) => {
    try {

        const user = await models.User.build({
            email: req.body.email,
            name: req.body.name,
            UserTypeId: 2,
            CompanyId: req.params.id,
            UserStatusId: 1
        });
        await user.sendRegistationRequestEmail();
        await user.save();
        res.status(201).send({
            id: user.id,
            msg: "Cadastrado com sucesso."
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error', err })
    }
}