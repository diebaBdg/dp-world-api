const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        res.send({
            data: await models.CompanyType.findAll()
        });
    } catch (err) {
        res.status(500).send({ msg: 'Internal Error' })
    }
}