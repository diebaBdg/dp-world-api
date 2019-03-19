const frisby = require('frisby');

it('GET shoud return a list of companies', () => {
    return frisby.get('http://localhost:3000/companies')
        .expect('status', 200)
        .expect('jsonTypes', 'data', frisby.Joi.array())
})
