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

exports.getOne = async (req, res) => {
    try {
        return res.send({
            data: await models.Company.findOne({where: {id: req.params.id}})
        }) 
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
        const contacts = await company.getUsers();
        const attachments = await company.getCompanyAttachments();

        if(!company.isStatusFlowValid(companyStatusId)){
            res.status(422).send({ msg: 'O fluxo de status não é válido.' });
            return false;
        }

        if (companyStatusId == 2) {
            for (contact of contacts) {
                await contact.enableAndSendEmail();
            }
        }
        if (companyStatusId == 4) {
            for (contact of contacts) {
                await contact.SendEmail('Você teve documento(s) da empresa rejeitado(s). Acesse o sistema e faça o envio novamente.');
            }
        }
        if (companyStatusId == 5) {
            let rejectedOrNotOk = attachments.filter(attachment => attachment.AttachmentStatusId == 4 || attachment.AttachmentStatusId == 1);
            if(rejectedOrNotOk.length){
                res.status(422).send({ msg: 'Não é possivel alterar o status por há arquivos aguardando aprovação ou rejeitados' });
                return false;
            }else{
                for (contact of contacts) {
                    await contact.SendEmail('Documentos da empresa aprovados. Credencie os colaboradores.');
                }
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

exports.postAttachment = async (req, res) => {
    try {
        if(!req.file){
            res.status(422).send({msg: "Deve ser um arquivo"});
            return false;
        }
        const validityDate = new Date();
        const companyAttachmentCreated = await models.CompanyAttachment.create({
            originalName: req.file.originalname,
            fileName: req.file.filename,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            destination: req.file.destination,
            size: req.file.size,
            path: req.file.path,
            validityDate: validityDate,
            AttachmentStatusId: 1,
            CompanyId: req.params.id,
            DocumentId: req.body.DocumentId
        });
        await models.CompanyAttachment.update({
            AttachmentStatusId: 3
        },{
            where: {
                CompanyId: req.params.id,
                DocumentId: req.body.DocumentId,
                id: {
                    [Op.ne]: companyAttachmentCreated.id
                }
            }
        })
        res.status(201).send({
            id: companyAttachmentCreated.id,
            msg: "Anexado com sucesso"
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.getAttachments = async (req, res) => {
    try {
        const attachments = await models.CompanyAttachment.findAll({
            where: {
                CompanyId: req.params.id
            },
            include: [{
                model: models.AttachmentStatus,
                attributes: ['id','name'],
                where:{
                    id: {
                        [Op.ne]: 3
                    }
                }
            }],
            order: [
                ['id', 'DESC']
            ]
        });
        res.send({
            rows: attachments
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.getAttachmentFile = async (req, res) => {
    try {
        const attachment = await models.CompanyAttachment.findOne({
            where: {id: req.params.idAttachment}
        });
        res.download(attachment.path);
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.pathAttachment = async (req, res) => {
    try {
        const updated = await models.CompanyAttachment.update({
            AttachmentStatusId: req.body.AttachmentStatusId,
            note: req.body.note
        },{
            where:{
                id: req.params.idAttachment
            }
        });
        res.status(200).send({ 
            updated: updated[0],
            msg: "Atualizado com sucesso."
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}