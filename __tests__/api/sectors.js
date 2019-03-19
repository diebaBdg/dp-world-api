const frisby = require('frisby');

it('GET shoud return a list of sectors', () => {
    return frisby.get('http://localhost:3000/sectors')
        .expect('status', 200)
        .expect('jsonTypes', 'data', frisby.Joi.array())
})
