const models = require('../db/models');
const jwt = require("jwt-simple");
const cfg = require("../config/config-auth");
const md5 = require('md5');
const ActiveDirectory = require('activedirectory2');
var config = {
    url: 'ldap://ldap.forumsys.com',
    baseDN: 'dc=example,dc=com',
    username: '',
    password: ''
}
var ad = new ActiveDirectory(config);


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
            // try login in LDAP server,
            ad.authenticate(email, req.body.password, async (err, auth) => {
                if (err) {
                    console.log('ERROR: ' + JSON.stringify(err));
                    if(err.lde_message == "Invalid Credentials"){
                        res.status(400).send({ msg: "Usuário ou senha inválidos." })
                        return;
                    }
                    res.status(500).send({ msg: "Não foi possivel conectgar ao LDAP." })
                    return;
                }
                if (auth) {
                    console.log('Authenticated!');
                    try {
                        let user1 = await models.User.findOne({ where: { email } });
                        if (!user1) {
                            user1 = await models.User.create({
                                email: email,
                                password: password,
                                UserTypeId: 1,
                                UserStatusId: 1,
                                SectorId: 3,
                                CompanyId: 1
                            });
                        }
                        var payload = { id: user1.id };
                        var token = jwt.encode(payload, cfg.jwtSecret);
                        user1.password = undefined;
                        res.json({ token: token, user1 });
                    } catch (err) {
                        console.log(err);
                        res.status(500).send({ msg: "Internal error" })
                    }

                }
                else {
                    console.log('Authentication failed!');
                    res.status(400).send({ msg: "Usuário ou senha inválidos." });
                }
            });

        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Internal error" })
    }
}

exports.testSincronize = async (req, res, next) => {
    try {
        var _ = require('underscore');
        var query = 'cn=*';

        ad.find(query, function (err, results) {
            if ((err) || (!results)) {
                console.log('ERROR: ' + JSON.stringify(err));
                console.log('ERROR: ' + JSON.stringify(results));
                res.status(500).send({ msg: 'nao foi' })
                return;
            }

            console.log('Groups');
            _.each(results.groups, function (group) {
                console.log(JSON.stringify(group));
            });

            console.log('Users');
            _.each(results.users, function (user) {
                console.log(JSON.stringify(user));
            });

            console.log('Other');
            _.each(results.other, function (other) {
                console.log(JSON.stringify(other));
            });
            res.send({ msg: 'foi' })
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Internal error" })
    }
}

exports.testAuthenticate = async (req, res, next) => {
    try {
        var username = req.body.username;
        var password = req.body.password;
        ad.authenticate(username, password, function (err, auth) {
            if (err) {
                console.log('ERROR: ' + JSON.stringify(err));
                res.status(500).send(err)
                return;
            }

            if (auth) {
                console.log('Authenticated!');
            }
            else {
                console.log('Authentication failed!');
            }
            res.send({ msg: auth })
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Internal error" })
    }
}

