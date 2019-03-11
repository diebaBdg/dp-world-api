const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        res.send({
            documentTypes: await models.CompanyType.findAll()
        });
    } catch (err) {
        res.status(500).send({ msg: 'Internal Error' })
    }
}