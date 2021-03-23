"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport-jwt");
var User = require("../models/User");
var ExtractJwt = passport.ExtractJwt;
var JwtStrategy = passport.Strategy;
var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.secretOrKey,
};
exports.default = (function (passport) {
    passport.use(new JwtStrategy(options, function (jwt_payload, done) {
        return User.findById(jwt_payload.id)
            .then(function (user) {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
            .catch(function (err) { return console.log(err); });
    }));
});
