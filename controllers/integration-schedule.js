const models = require('../db/models');
const Paginator = require('../helpers/paginator-helper');
const orderHerper = require('../helpers/order-helper');
const moment = require('moment');

exports.get = async (req, res) => {
    try {
        const paginator = new Paginator(req.query.page);
        let filter = {};
        let data = await models.IntegrationSchedule.findAndCountAll({
            include: [{
                model: models.Integration,
                attributes: ['id', 'date']
            },{
                model: models.Employee,
                attributes: ['id', 'name']
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
        // validar se a data da integração já passou
        // validar se possuem vagas nessa integração
        // validar se o usuário já está cadastrado para essa integração
        const now = moment().format();
        const integration = await models.Integration.findOne({where: {id: req.body.IntegrationId}});
        const integrationSchedule = await models.IntegrationSchedule.findOne({
            where: {
                IntegrationId: req.body.IntegrationId,
                EmployeeId: req.body.EmployeeId
            }
        });
        const integrationDate = moment(integration.date);
        const amountRegistrations = (await integration.getIntegrationSchedules()).length;

        if(amountRegistrations >= integration.vacancies){
            res.status(400).send({msg: "Não há vagas disponíveis."})
            return false;
        }
        if(integrationSchedule){
            res.status(400).send({msg: "O funcionário já está agendado para essa integração."})
            return false;
        }
        if(integrationDate.isBefore(now)){
            res.status(400).send({msg: "A data da integração já passsou e por isso não é possivel fazer o agendamento."})
            return false;
        }

        const scheduleCreated = await models.IntegrationSchedule.create(req.body);
        res.status(201).send({
            id: scheduleCreated.id,
            msg: "Cadastrado com sucesso."
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}