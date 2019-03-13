const models = require('../db/models');

exports.get = async (req, res) => {
    try {
        res.send({
            data: await models.CompanyType.findAll({where: {status: 1}})
        });
    } catch (err) {
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.post = async (req, res) => {
    try{
        // get request body
        let campanyType = req.body;
        // get documents and verify if exists document with the same name
        const campanyTypes = await models.CompanyType.findAll({ where: { description: campanyType.description } });
        if(!campanyTypes.length){
            // set status active and creating document
            campanyType.status = 1;
            res.status(201).send({id: (await models.CompanyType.create(campanyType)).id});
        }else{
            res.status(400).send({ msg: "Item already exists." });
        }
    }catch(err){
        console.log(err);
        res.status(500).send({msg: 'Internal Error'})
    }
}

exports.delete = async (req, res) => {
    try{
        const id = req.params.id;
        const result = models.CompanyType.update({
            status: 0
        },{
            where: {
                id: id
            }
        })
        res.send({id: id, result})
    }catch(err){
        console.log(err);
        res.status(500).send({msg: 'Internal Error'})
    }
}


exports.getDocuments = async (req, res) => {
    try{
        const id = req.params.id;
        const filters = req.query;
        const documents = await models.Document.findAll({
            where: filters,
            include: [{
                model: models.DocumentToCompanyType,
                where: {
                    CompanyTypeId: id
                }
            }]
        });
        res.send({ data: documents });
    }catch(err){
        console.log(err);
        res.status(500).send({msg: 'Internal Error'})
    }
}