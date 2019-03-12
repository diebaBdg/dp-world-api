const frisby = require('frisby');

it('GET shoud return a list of documents', () => {
    return frisby.get('http://localhost/documents')
        .expect('status', 200)
        .expect('jsonTypes', 'data', frisby.Joi.array())
})

it('POST should return a status of 201 Created', function () {
    return frisby
        .post('http://localhost/documents', {
            description: `Frisby test ${new Date()}`,
            DocumentTypeId: 1,
	        FunctionId: 1
        })
        .expect('status', 201);
});