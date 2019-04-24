const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        res.send(
            await models.EmployeeStatus.findAndCountAll({order: [['id','ASC']]})
        );
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}