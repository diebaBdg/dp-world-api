var models  = require('../db/models');
var express = require('express');
var router  = express.Router();

router.get('/', async (req, res) => {
    let Empresa = models.Empresa;
    let empresas = await Empresa.findAll();
    res.send(empresas);
});

router.post('/', async (req, res) => {
    let Empresa = models.Empresa;
    let result = await Empresa.create({cnpj: '33333333333333'});
    res.send(result);
});

module.exports = router;