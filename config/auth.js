// auth.js
var passport = require("passport");
var passportJWT = require("passport-jwt"); const models = require('../db/models');
var cfg = require("./config-auth");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function () {
    var strategy = new Strategy(params, async (payload, done) => {
        let user = await models.User.findOne({ where: { id: payload.id, UserStatusId: 1 } });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'User not found.' });
        }
    });
    passport.use(strategy);
    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};