const models = require('../db/models');
const Paginator = require('../helpers/paginator-helper');
const orderHerper = require('../helpers/order-helper');

exports.get = async (req, res) => {
    try {
        const paginator = new Paginator(req.query.page);
        // filter definition
        let filter = {};
        if (req.query.CompanyId !== undefined) {
            filter.CompanyId = req.query.CompanyId
        }
        // get objects
        let data = await models.Employee.findAndCountAll({
            where: filter,
            order: orderHerper.getOrder(req.query.order_by, req.query.order_direction),
            limit: paginator.limit,
            offset: paginator.offset
        });
        data.pages = paginator.getNumberOfPages(data.count);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}

exports.post = async (req, res) => {
    try {
        let employee = req.body;
        employee.EmployeeStatusId = 1;
        const employeeCreated = models.Employee.create(employee);
        res.send({
            id: employeeCreated.id,
            msg: "Cadastrado com sucesso."
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Internal Error' })
    }
}