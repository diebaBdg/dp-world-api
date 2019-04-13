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
        // get objects
        let data = await models.Employee.findAndCountAll({
            where: filter,
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

exports.post = async (req, res) => {
    try {
        let employee = req.body;
        employee.EmployeeStatusId = 1;
        const employeeCreated = models.Employee.create(employee);
        res.send({
            id: employeeCreated.id,
            msg: "Cadastrado com sucesso."
        })
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
        if(!documentToCompanyType){
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