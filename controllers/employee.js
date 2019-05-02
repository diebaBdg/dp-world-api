const models = require('../db/models');
const Paginator = require('../helpers/paginator-helper');
const orderHerper = require('../helpers/order-helper');
const Op = require('sequelize').Op;

exports.get = async (req, res) => {
    try {
        const paginator = new Paginator(req.query.page);
        // filter definition
        let filter = {};
        if (req.query.CompanyId !== undefined) {
            filter.CompanyId = req.query.CompanyId
        }
        if (req.query.EmployeeStatusId !== undefined) {
            filter.EmployeeStatusId = req.query.EmployeeStatusId
        }
        if (req.query.name !== undefined) {
            filter.name = { [Op.like]: `%${req.query.name}%` }
        }
        let data = await models.Employee.findAndCountAll({
            where: filter,
            include: [{
                model: models.EmployeeStatus
            }, {
                attributes: ['id', 'cnpj', 'socialName'],
                model: models.Company
            }, {
                model: models.IntegrationSchedule
            }],
            order: orderHerper.getOrder(req.query.order_by, req.query.order_direction),
            limit: paginator.limit,
            offset: paginator.offset
        });
        data.pages = paginator.getNumberOfPages(data.count);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.getOne = async (req, res) => {
    try {
        res.send(await models.Employee.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: models.EmployeeStatus
            }, {
                attributes: ['id', 'cnpj', 'socialName'],
                model: models.Company
            }]
        }));
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.patch = async (req, res) => {
    try {
        const employeeStatusId = req.body.EmployeeStatusId;
        const employee = await models.Employee.findOne({ where: { id: req.params.id } });
        const company = await employee.getCompany();
        const contacts = await company.getUsers();
        const attachments = await employee.getEmployeeAttachments({
            include: [{
                model: models.Document,
                attributes: ['id', 'description']
            }]
        });

        if (!employee.isStatusFlowValid(employeeStatusId)) {
            res.status(422).send({ msg: 'O fluxo de status não é válido.' });
            return false;
        }

        if (employeeStatusId == 2) {
            const users = await models.User.findAll({ UserTypeId: 1 });
            const notifications = users.map(user => {
                return models.Notification.build({
                    UserId: user.id,
                    message: `O cadastro ${company.cnpj} – ${company.socialName} encaminhou documentos de colaboradores.`
                })
            })
            for (notification of notifications) {
                await notification.sendEmail();
                await notification.save();
            }
        }
        if (employeeStatusId == 3) {
            let refuseText = attachments.filter(item => item.AttachmentStatusId == 4).map(item => `<b>Documento</b>: ${item.Document.description}. <b>Motivo</b>: ${item.note ? item.note : 'não informado.'}`).join('<br>');
            const notifications = contacts.map(user => {
                return models.Notification.build({
                    UserId: user.id,
                    message: `Olá,<br>Você teve documento(s) do colaborador ${employee.name} rejeitado(s). Acesse o sistema e faça o envio novamente.<br><br>` + refuseText
                })
            });
            for (notification of notifications) {
                await notification.sendEmail();
                await notification.save();
            }
        }
        if (employeeStatusId == 4) {
            let rejectedOrNotOk = attachments.filter(attachment => attachment.AttachmentStatusId == 4 || attachment.AttachmentStatusId == 1);
            if (rejectedOrNotOk.length) {
                res.status(422).send({ msg: 'Não é possivel alterar o status por há arquivos aguardando aprovação ou rejeitados' });
                return false;
            } else {
                const notifications = contacts.map(user => {
                    return models.Notification.build({
                        UserId: user.id,
                        message: `Olá, Documentos do colaborador ${employee.name} aprovados. Agende a integração.`
                    })
                });
                for (notification of notifications) {
                    await notification.sendEmail();
                    await notification.save();
                }
            }
        }
        if (employeeStatusId == 5) {
            const notifications = contacts.map(user => {
                return models.Notification.build({
                    UserId: user.id,
                    message: `Olá, o colaborador ${employee.name} foi habilitado.`
                })
            });
            for (notification of notifications) {
                await notification.sendEmail();
                await notification.save();
            }
        }

        await employee.update({
            EmployeeStatusId: employeeStatusId
        });
        res.send({
            updated: 1,
            msg: "Atualizado com sucesso."
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.post = async (req, res) => {
    try {
        let employee = req.body;
        employee.EmployeeStatusId = 1;
        const employeeCreated = models.Employee.create(employee);
        res.status(201).send({
            id: employeeCreated.id,
            msg: "Cadastrado com sucesso."
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.postAttachment = async (req, res) => {
    try {
        if (!req.file) {
            res.status(422).send({ msg: "Deve ser um arquivo" });
            return false;
        }
        const employee = await models.Employee.findOne({ where: { id: req.params.id } });
        const company = await employee.getCompany();
        const documentToCompanyType = await models.DocumentToCompanyType.findOne({ where: { CompanyTypeId: company.CompanyTypeId, DocumentId: req.body.DocumentId } });
        if (!documentToCompanyType) {
            res.status(422).send({ msg: "Não é anexar pois o documento não está associado ao tipo de empresa" });
            return false;
        }

        const employeeAttachmentCreated = await models.EmployeeAttachment.create({
            originalName: req.file.originalname,
            fileName: req.file.filename,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            destination: req.file.destination,
            size: req.file.size,
            path: req.file.path,
            validityDate: documentToCompanyType.generateValidityDate(),
            AttachmentStatusId: 1,
            EmployeeId: req.params.id,
            DocumentId: req.body.DocumentId
        });
        await models.EmployeeAttachment.update({
            AttachmentStatusId: 3
        }, {
                where: {
                    EmployeeId: req.params.id,
                    DocumentId: req.body.DocumentId,
                    id: {
                        [Op.ne]: employeeAttachmentCreated.id
                    }
                }
            })
        res.status(201).send({
            id: employeeAttachmentCreated.id,
            msg: "Anexado com sucesso"
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.getAttachments = async (req, res) => {
    try {
        const attachments = await models.EmployeeAttachment.findAll({
            where: {
                EmployeeId: req.params.id
            },
            include: [{
                model: models.AttachmentStatus,
                attributes: ['id', 'name'],
                where: {
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
        const attachment = await models.EmployeeAttachment.findOne({
            where: { id: req.params.idAttachment }
        });
        res.download(attachment.path);
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.pathAttachment = async (req, res) => {
    try {
        const updated = await models.EmployeeAttachment.update({
            AttachmentStatusId: req.body.AttachmentStatusId,
            note: req.body.note
        }, {
                where: {
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