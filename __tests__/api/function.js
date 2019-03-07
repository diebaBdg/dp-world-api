const frisby = require('frisby');

it('GET shoud return a list of functions', () => {
    return frisby.get('http://localhost/functions')
        .expect('status', 200)
        .expect('jsonTypes', 'functions', frisby.Joi.array())
})

it('POST should return a status of 201 Created', function () {
    return frisby
        .post('http://localhost/functions', {
            description: `Frisby test ${new Date()}`
        })
        .expect('status', 201);
});