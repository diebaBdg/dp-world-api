const frisby = require('frisby');

it('GET shoud return a list of document types', () => {
    return frisby.get('http://localhost/document-types')
        .expect('status', 200)
        .expect('jsonTypes', 'documentTypes', frisby.Joi.array())
})