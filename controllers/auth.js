const models = require('../db/models');
const jwt = require("jwt-simple");
const cfg = require("../config/config-auth");
const md5 = require('md5');
const ActiveDirectory = require('activedirectory2');
const Op = require('sequelize').Op;
const moment = require('moment');

var config = {
    // url: 'ldap://embraport.net',
    // baseDN: 'dc=embraport,dc=net',
    // username: 'speedsoft@embraport.net',
    // password: 'Sp33dqu@18'
    url: 'ldap://ldap.forumsys.com',
    baseDN: 'dc=example,dc=com',
    username: '',
    password: ''
}

var ad = new ActiveDirectory(config);


exports.post = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = md5(req.body.password);
        let user = await models.User.findOne({
            where: {
                [Op.or]: [{ email: email }, { userName: email }],
                UserStatusId: 1
            }
        });
        ad.findUser(email, async (err, userAD) => {
            console.log('userAD', userAD);
            console.log('err', err);
            console.log(req.body.password);


            if (userAD == undefined) {
                console.log('ERROR: ' + JSON.stringify(err));
                if (user && user.password == password) {
                    let payload = { id: user.id };
                    let token = jwt.encode(payload, cfg.jwtSecret);
                    user.password = undefined;
                    res.json({ token: token, user });
                } else {
                    res.status(400).send({ msg: "Usuário ou senha inválidos." })
                }
                return;
            }


            // try LDAP altentication
            ad.authenticate(userAD.distinguishedName, req.body.password, async (err, auth) => {
                if (err) {
                    console.log('ERROR: ' + JSON.stringify(err));
                    if (user && user.password == password) {
                        let payload = { id: user.id };
                        let token = jwt.encode(payload, cfg.jwtSecret);
                        user.password = undefined;
                        res.json({ token: token, user });
                    } else {
                        res.status(400).send({ msg: "Usuário ou senha inválidos." })
                    }
                    return;
                }
                if (auth) {
                    try {
                        if (!user) {
                            user = await models.User.create({
                                userName: userAD.sAMAccountName,
                                email: userAD.mail,
                                password: null,
                                name: userAD ? userAD.cn : null,
                                UserTypeId: 1,
                                UserStatusId: 1,
                                SectorId: 3,
                                CompanyId: 1
                            });
                        } else {
                            user.update({
                                password: null
                            })
                        }
                        let payload = { id: user.id };
                        let token = jwt.encode(payload, cfg.jwtSecret);
                        user.password = undefined;
                        res.json({ token: token, user });
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
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Internal error" })
    }
}

exports.testSincronize = async (req, res, next) => {
    try {
        var _ = require('underscore');
        var query = '(&(objectClass=user)(objectCategory=person))';

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

        ad.findUser(username, async (err, userAD) => {
            console.log('userAD', userAD);
            console.log('err', err);


            console.log(userAD.distinguishedName);
            console.log(password);
            ad.authenticate(userAD.distinguishedName, password, function (err, auth) {
                if (err) {
                    console.log('ERROR: ' + JSON.stringify(err));
                    res.status(500).send(err)
                    return;
                }

                if (auth) {
                    console.log('Authenticated!');
                    console.log(auth);
                    ad.getGroupMembershipForUser('monalizab', function (err, groups) {
                        if (err) {
                            console.log('ERROR: ' + JSON.stringify(err));
                            return;
                        }

                        if (!groups) console.log('User: ' + sAMAccountName + ' not found.');
                        else console.log(groups);
                    });
                }
                else {
                    console.log('Authentication failed!');
                }
                res.send({ msg: auth })
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Internal error" })
    }
}


exports.postRequestChangePassword = async (req, res, next) => {
    try {
        const hash = md5(moment() + req.body.email)
        const user = await models.User.findOne({
            where: { email: req.body.email }
        });
        if (!user){
            res.status(400).send({ msg: "Usuário não cadastrado." });
        }else if (user.UserTypeId != 2) {
            await user.update({
                hash: hash
            });
            await user.SendEmail(`Olá ${user.name},<br>
                                  Você solicitou uma troca de senha, para concluí-la <a href="http://localhost/#/update-password/${hash}">clique aqui</a>.<br>
                                  Link: http://localhost/#/update-password/${hash}`)
            res.send({ msg: "Troca de senha solicitada com sucesso" });
        } else {
            res.status(400).send({ msg: "Só é possivel solicitar a troca de senha de usuário do tipo externo." });
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Internal error" })
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: { hash: req.params.hash }
        });
        if (user) {
            user.password = undefined;
            res.send(user);
        } else {
            res.status(400).send({ msg: "Hash inválido." })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Internal error" })
    }
}

exports.putUserPassword = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: { hash: req.params.hash }
        });
        if (user) {
            user.password = md5(req.body.password);
            user.hash = null;
            await user.save();
            res.send({ msg: "Senha alterada com sucesso." });
        } else {
            res.status(400).send({ msg: "Hash inválido." })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Internal error" })
    }
}