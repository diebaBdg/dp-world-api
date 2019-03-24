const models = require('../db/models');
const md5 = require('md5');
const emailHelper = require('../helpers/email-helper');

exports.get = async (req, res) => {
    try {
        res.send({
            data: await models.Company.findAll({ 
                where: req.query,
                include: [{
                    model: models.CompanyStatus
                },{
                    model: models.CompanyType
                },{
                    model: models.User,
                    where: {UserStatusId: 1}
                }]
            })
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}

exports.post = async (req, res) => {
    try {
        // get request body
        let company = req.body;
        const password = Math.random().toString(36).slice(-8);
        let mailOptions = {
            from: '"noreply dp-world" noreply@speedsoftware.com.br',
            to: company.contactEmail,
            subject: "Cadastro",
            html: ` <p><b>Cadastro na dp-world</b></p>
                    <p>Seus dados foram enviados para a avaliação de cadastro. Após confirmados, você receberá um email para realizar o envio dos documentos.</p>
                    <p>Dados para login</p>
                    <br><p>Usuário: ${company.contactEmail}</p>
                    <p>Senha: ${password}</p>`
        };
        // sending email
        emailHelper.sendMail(mailOptions, async (error, info) => {
            if (error) {
                res.status(500).send({ msg: "Internal Error"});
                return;
            }
            // set status and create company
            company.CompanyStatusId = 1;
            const companyCreated = await models.Company.create(company);
            // create User to a created company
            const passwordMd5 = md5(password);
            await models.User.create({
                password: passwordMd5,
                email: company.contactEmail,
                name: company.contactName + password,
                UserTypeId: 2,
                UserStatusId: 1,
                CompanyId: companyCreated.id
            });
            res.status(201).send({
                id: companyCreated.id
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error', err })
    }
}

exports.put = async (req, res) => {
    try {
        const updated = await models.Company.update({
            SectorId: req.body.SectorId,
            CompanyStatusId: req.body.CompanyStatusId
        }, {
                where: {
                    id: req.params.id
                }
            });
        res.status(200).send({ updated: updated[0] });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error', err })
    }
}