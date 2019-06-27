const { check, validationResult } = require('express-validator/check');
const models = require('../../db/models');

exports.post = [
    check('SectorId')
        .isNumeric()
        .withMessage("Deve ser numérico")
        .custom((SectorId) => {
            return models.Sector.findOne({ where: { id: SectorId } }).then(sector => {
                if (!sector) {
                    return Promise.reject('Setor inválido.');
                }
            });
        }),
    // check('email')
    //     .isEmail()
    //     .withMessage("Deve ser um email válido")
    //     .custom((email) => {
    //         return models.User.findOne({ where: { email: email } }).then(employee => {
    //             if (employee) {
    //                 return Promise.reject('Isntrutor já cadastrado.');
    //             }
    //         });
    //     })
];