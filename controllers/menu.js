const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        const menu = await models.Menu.findAll({
            include: [{
                model:models.Menu,
                as: 'Menu1',
                include: [{
                    model:models.Menu,
                    as: 'Menu2'
                }]
            }],
            where: { MenuId: null } 
        });
        res.send({data: menu});
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}