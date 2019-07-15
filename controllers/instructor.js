const models = require('../db/models');

exports.post = async (req, res) => {
    try {
        const user = await models.User.findOne({where: {email: req.body.email}});
        const userName = (req.body.email.split('@'))[0];
        if(!user){
            const user = await models.User.create({
                userName: userName,
                email: req.body.email,
                password: null,
                name: req.body.name,
                UserTypeId: 1,
                UserStatusId: 1,
                SectorId: req.body.SectorId
            });
            res.status(201).send({
                id: user.id,
                msg: "Cadastrado com sucesso."
            });
        }else{
            res.status(201).send({msg: "Instrutor já cadastrado."});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}

exports.get = async (req, res) => {
    try {

        let filter = {};
        filter.SectorId = Array(5, 6, 12);

        let data = await models.User.findAll({
            where: filter,
            include: [{
                model: models.Sector
            }],
        });
        res.send(data);

    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}