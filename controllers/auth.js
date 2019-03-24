const models = require('../db/models');
const jwt = require("jwt-simple");
const cfg = require("../config/config-auth");
const md5 = require('md5');

exports.post = async (req, res, next) => {
    try {
        var email = req.body.email;
        var password = md5(req.body.password);
        let user = await models.User.findOne({ where: { email, password, UserStatusId: 1 } });
        if (user) {
            var payload = { id: user.id };
            var token = jwt.encode(payload, cfg.jwtSecret);
            user.password = undefined;
            res.json({ token: token, user });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Internal error" })
    }
}