const models = require('../db/models');
const Op = require('sequelize').Op;
const Paginator = require('../helpers/paginator-helper');
const orderHerper = require('../helpers/order-helper');
const md5 = require('md5');
const emailHelper = require('../helpers/email-helper');

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
        data.pages = paginator.pagesNumber(data.count);
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
        const companyId = req.params.id;
        // case status is 2, create a password to all contacts and send email
        if (companyStatusId == 2) {
            const company = await models.Company.findOne({ where: { id: companyId } });
            let contacts = await company.getUsers();
            for (contact of contacts) {
                const randomPassword = Math.random().toString(36).slice(-8);
                // send email with new password
                let mailOptions = {
                    from: '"noreply dp-world" noreply@speedsoftware.com.br',
                    to: contact.email,
                    subject: "Cadastro",
                    html: ` <p><b>Cadastro na dp-world</b></p>
                            <p>${contact.name}, seus dados foram aprovados e você pode realizar login com os dados abaixo.</p>
                            <br><p>Usuário: ${contact.email}</p>
                            <p>Senha: ${randomPassword}</p>`
                };
                await emailHelper.sendMail(mailOptions);
                // update the user data
                contact.password = md5(randomPassword);
                await contact.save();
            }
        }
        const updated = await models.Company.update({
            SectorId: req.body.SectorId,
            CompanyStatusId: companyStatusId
        }, {
                where: {
                    id: companyId
                }
            });
        res.status(200).send({ updated: updated[0] });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error', err })
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
        // send email with new password
        let mailOptions = {
            from: '"noreply dp-world" noreply@speedsoftware.com.br',
            to: req.body.email,
            subject: "Cadastro",
            html: ` <p><b>Cadastro na dp-world</b></p>
                    <p>${req.body.name}, seus dados foram enviados para a avaliação de cadastro. Após confirmados, você receberá um email para realizar o envio dos documentos.</p>`
        };
        await emailHelper.sendMail(mailOptions);
        // create User to a created company
        const user = await models.User.create({
            email: req.body.email,
            name: req.body.name,
            UserTypeId: 2,
            CompanyId: req.params.id,
            UserStatusId: 1
        });
        res.status(201).send({
            id: user.id,
            msg: "Cadastrado com sucesso."
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error', err })
    }
}