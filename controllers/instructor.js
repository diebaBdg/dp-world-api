const models = require('../db/models');

exports.post = async (req, res) => {
    try {
        const ad = require('../helpers/ad-helper');
        ad.findUser(req.body.email, async (err, userAD) => {
            if (err) {
                res.status(500).send({ msg: 'Internal Error: Não foi possível conectar com o AD' });
                return false;
            }
            if (userAD) {
                const user = await models.User.create({
                    userName: userAD.sAMAccountName,
                    email: userAD.mail,
                    password: null,
                    name: userAD ? userAD.cn : null,
                    UserTypeId: 1,
                    UserStatusId: 1,
                    SectorId: req.body.SectorId,
                    CompanyId: 1
                });
                res.status(201).send({ 
                    id: user.id,
                    msg: "Cadastrado com sucesso."
                });
            } else {
                res.status(400).send({ msg: 'Não foi possível encontrar o usuário no AD' });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' });
    }
}