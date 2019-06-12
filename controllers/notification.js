const models = require('../db/models');
const Paginator = require('../helpers/paginator-helper');
const orderHerper = require('../helpers/order-helper');

exports.get = async (req, res) => {
    try {
        const paginator = new Paginator(req.query.page);
        // filter definition
        let filter = {};
        if (req.query.UserId) {
            filter.UserId = req.query.UserId
        }
        if (req.query.EmployeeId) {
            filter.EmployeeId = req.query.EmployeeId
        }
        if (req.query.visualized) {
            filter.visualized = req.query.visualized
        }
        let data = await models.Notification.findAndCountAll({
            where: filter,
            include: [{
                model: models.User,
                attributes: ['id', 'name']
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

exports.patch = async (req, res) => {
    try {
        const visualized = req.body.visualized;
        const updated = await models.Notification.update({visualized},{
            where: {id: req.params.id}
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