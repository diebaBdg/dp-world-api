const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        let userTypeid = req.user.UserTypeId;
        userTypeid = 1;
        const user = await models.UserType.findOne({
            where: {id: userTypeid},
            include: [{
                model: models.Menu,
                through: {
                    where: {
                        UserTypeId: userTypeid
                    }
                },
            }]
        });
        res.send({data: user.Menus});
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}