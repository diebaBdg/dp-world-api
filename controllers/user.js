const models = require('../db/models');
const Paginator = require('../helpers/paginator-helper');
const orderHerper = require('../helpers/order-helper');

exports.get = async (req, res) => {
    try {
        const paginator = new Paginator(req.query.page);
        // filter definition
        let filter = {};
        let data = await models.User.findAndCountAll({
            where: filter,
            include: [{
                model: models.Sector,
                attributes: ['name']
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
        const user = await models.User.findOne({ where: { id: req.params.id } });
        user.SectorId = req.body.SectorId;
        await user.save();
        res.send({ msg: "atualizado com sucesso." });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}