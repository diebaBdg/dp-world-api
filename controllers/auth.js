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
            res.status(400).send({ msg: "Usuário ou senha inválidos." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Internal error" })
    }
}

exports.testSincronize = async (req, res, next) => {
    try {
        var ActiveDirectory = require('activedirectory');
        var config = {
            url: 'ldap://ldap.forumsys.com',
            baseDN: 'dc=example,dc=com',
            username: '',
            password: ''
        }
        var ad = new ActiveDirectory(config);
        // var username = 'uid=euclid,dc=example,dc=com';
        // var password = 'password';
        // ad.authenticate(username, password, function(err, auth) {
        //     if (err) {
        //       console.log('ERROR: '+JSON.stringify(err));
        //       res.status(500).send(err)
        //       return;
        //     }

        //     if (auth) {
        //       console.log('Authenticated!');
        //     }
        //     else {
        //       console.log('Authentication failed!');
        //     }
        //     res.send({msg: auth})
        //   });

        var _ = require('underscore');
        var query = 'cn=*';
        // var opts = {
        //     includeMembership: ['group', 'user'], // Optionally can use 'all'
        //     includeDeleted: false
        // };

        var ad = new ActiveDirectory(config);
        ad.find(query, function (err, results) {
            if ((err) || (!results)) {
                console.log('ERROR: ' + JSON.stringify(err));
                console.log('ERROR: ' + JSON.stringify(results));
                res.status(500).send({msg: 'nao foi'})
                return;
            }

            console.log('Groups');
            _.each(results.groups, function (group) {
                console.log('  ' + group.cn);
            });

            console.log('Users');
            _.each(results.users, function (user) {
                console.log('  ' + user.cn);
            });

            console.log('Other');
            _.each(results.other, function (other) {
                console.log(other);
            });
            res.send({msg: 'foi'})
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Internal error" })
    }
}