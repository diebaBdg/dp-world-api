const models = require('../db/models');
const Paginator = require('../helpers/paginator-helper');
const orderHerper = require('../helpers/order-helper');
const moment = require('moment');
const Op = require('sequelize').Op;
const pdf = require('html-pdf');

exports.get = async (req, res) => {
    try {
        const paginator = new Paginator(req.query.page);
        const now = moment().format();
        // filter definition
        let filter = {};
        if (req.query.occurrence) {
            const occurrence = req.query.occurrence.toUpperCase();
            if (occurrence == 'FUTURE') {
                filter.date = { [Op.gte]: now };
            } else if (occurrence == 'PAST') {
                filter.date = { [Op.lte]: now };
            }
        }
        let data = await models.Integration.findAndCountAll({
            where: filter,
            include: [{
                model: models.IntegrationSchedule,
                attributes: ['id', 'EmployeeId']
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

exports.post = async (req, res) => {
    try {
        const integrationCreated = await models.Integration.create(req.body);
        res.send({
            id: integrationCreated.id,
            msg: "Cadastrado com sucesso."
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.getPresenceList = async (req, res) => {
    try {
        const integration = await models.Integration.findOne({ where: { id: req.params.id } });
        const schedules = await integration.getIntegrationSchedules({
            include: [{
                attributes: ['id', 'name'],
                model: models.Employee
            }]
        });
        let presenceList = `
        <html>
        <table border="2" style="width:100%">
            <thead>
                <tr>
                    <th colspan="3">
                        Lista de presença de integração DP WORLD
                    </th>
                </tr>
                <tr>
                    <td>
                        <b>ID:</b> #${integration.id}
                    </td>
                    <td>
                        <b>Data:</b> ${moment(integration.date).format('DD/MM/YYYY HH:MM')}
                    </td>
                    <td>
                        <b>Instrutor:</b> ${integration.instructor}
                    </td>
                </tr>               
            </thead>
            <tbody>
                ${
            schedules.map((item) => {
                return `<tr>
                            <td colspan="3">
                            (  ) ${item.Employee.name}
                            </td>
                        </tr>`
            }).join()
            }
            </tbody>
        </table>
        </html>`;
        pdf.create(presenceList).toBuffer(function (err, buffer) {
            if (err) return res.send(err);
            res.type('pdf');
            res.end(buffer, 'binary');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.delete = async (req, res) => {
    try {
        const deleted = await models.Integration.destroy({ where: { id: req.params.id } });
        res.send({
            deleted: deleted,
            msg: "Excluído com sucesso."
        });
    } catch (err) {
        if (err.name == 'SequelizeForeignKeyConstraintError') {
            res.status(400).send({ msg: 'Não é possivel deletar porque a integração possui agendamentos cadastrados.' })
        } else {
            console.log(err);
            res.status(500).send({ msg: 'Internal Error' })
        }
    }
}

exports.put = async (req, res) => {
    try {
        const updated = models.Integration.update(req.body, {
            where: { id: req.params.id }
        })
        res.send({
            updated: updated[0],
            msg: "Atualizado com sucesso."
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}