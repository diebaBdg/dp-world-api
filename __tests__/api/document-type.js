const frisby = require('frisby');

it('GET shoud return a list of document types', () => {
    return frisby.get('http://localhost:3000/document-types')
        .expect('status', 200)
        .expect('jsonTypes', 'data', frisby.Joi.array())
})