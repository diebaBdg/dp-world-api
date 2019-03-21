const models = require('../db/models');
const { check, validationResult } = require('express-validator/check');
const md5 = require('md5');

exports.get = async (req, res) => {
    try {
        res.send({
            data: await models.Company.findAll({ where: req.query })
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.post = async (req, res) => {
    try {
        // get request body
        let company = req.body;
        // set status and create
        company.CompanyStatusId = 1;
        const companyCreated = await models.Company.create(company);
        //create User to a created company
        const password = Math.random().toString(36).slice(-8);
        const passwordMd5 = md5(password);
        await models.User.create({
            password: passwordMd5,
            email: company.contactEmail,
            name: company.contactName + password,
            UserTypeId: 2,
            UserStatusId: 1,
            CompanyId: companyCreated.id
        });
        res.status(201).send({
            id: companyCreated.id
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error', err })
    }
}

exports.put = async (req, res) => {
    try {
        const updated = await models.Company.update({
            SectorId: req.body.SectorId,
            CompanyStatusId: req.body.CompanyStatusId
        }, {
                where: {
                    id: req.params.id
                }
            });
        res.status(200).send({ updated: updated[0] });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error', err })
    }
}