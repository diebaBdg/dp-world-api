const frisby = require('frisby');

it('POST shoud auth a user', function () {
    return frisby
        .post(`http://localhost/auth`, {
            email: "velosojonathan5@gmail.com",
	        password: "ld31sjor"
        })
        .expect('status', 200);
});