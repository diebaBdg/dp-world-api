const frisby = require('frisby');
frisby.globalSetup({
    request: {
        headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mjh9.p7eo9A6pS9gHrM2YRUdyMUiLLqj1RqSNumpH8U_QR1s'
        }
    }
});

it('GET shoud return a list of sectors', () => {
    return frisby.get(`http://localhost/sectors`)
        .expect('status', 200)
        .expect('jsonTypes', 'data', frisby.Joi.array())
})
