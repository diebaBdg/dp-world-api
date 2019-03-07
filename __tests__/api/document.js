const frisby = require('frisby');

it('GET shoud return a list of documents', () => {
    return frisby.get('http://localhost/documents')
        .expect('status', 200)
        .expect('jsonTypes', 'documents', frisby.Joi.array())
})