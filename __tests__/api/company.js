const frisby = require('frisby');

it('shoud be a list of companies', () => {
    return frisby.get('http://localhost/companies')
        .expect('status', 200)
        .expect('jsonTypes', 'companies', frisby.Joi.array())
})