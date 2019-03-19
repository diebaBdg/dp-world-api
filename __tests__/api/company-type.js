const frisby = require('frisby');

it('GET shoud return a list of company types', () => {
    return frisby.get('http://localhost:3000/company-types')
        .expect('status', 200)
        .expect('jsonTypes', 'data', frisby.Joi.array())
})

it('POST should return a status of 201 Created', function () {
    return frisby
        .post('http://localhost:3000/company-types', {
            description: `Frisby test company type ${new Date()}`,
        })
        .expect('status', 201);
});

it('DELETE should return a status of 200 OK', function () {
    return frisby
        .delete('http://localhost:3000/company-types/1')
        .expect('status', 200);
});

it('GET shoud return a list of documents of a company type', () => {
    return frisby.get('http://localhost:3000/company-types/1/documents')
        .expect('status', 200)
        .expect('jsonTypes', 'data', frisby.Joi.array())
})