const models = require('../db/models');
const Paginator = require('../helpers/paginator-helper');
const orderHerper = require('../helpers/order-helper');
const moment = require('moment');
const Op = require('sequelize').Op;

exports.get = async (req, res) => {
    try {
        const paginator = new Paginator(req.query.page);
        const now = moment().format();
        // filter definition
        let filter = {};
        if(req.query.occurrence){
            const occurrence = req.query.occurrence.toUpperCase();
            if(occurrence == 'FUTURE'){
                filter.date = {[Op.gte]: now};
            }else if(occurrence == 'PAST'){
                filter.date = {[Op.lte]: now};
            }
        }
        let data = await models.Integration.findAndCountAll({
            where: filter,
            include:[{
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