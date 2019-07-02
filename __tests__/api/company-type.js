const frisby = require('frisby');
frisby.globalSetup({
    request: {
        headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mjh9.p7eo9A6pS9gHrM2YRUdyMUiLLqj1RqSNumpH8U_QR1s'
        }
    }
});


it('GET shoud return a list of company types', () => {
    return frisby.get(`http://localhost/company-types`)
        .expect('status', 200)
        .expect('jsonTypes', 'data', frisby.Joi.array())
})

it('POST should return a status of 201 Created', function () {
    return frisby
        .post(`http://localhost/company-types`, {
            description: `Frisby test company type ${new Date()}`,
        })
        .expect('status', 201);
});

it('DELETE should return a status of 200 OK', function () {
    return frisby
        .delete(`http://localhost/company-types/1`)
        .expect('status', 200);
});

it('GET shoud return a list of documents of a company type', () => {
    return frisby.get(`http://localhost/company-types/1/documents`)
        .expect('status', 200)
        .expect('jsonTypes', 'data', frisby.Joi.array())
})