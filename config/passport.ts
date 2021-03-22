import { Mongoose } from "mongoose";
import { Authenticator } from "passport";
import { StrategyOptions } from "passport-jwt";
import passport = require("passport-jwt");
const ExtractJwt = passport.ExtractJwt;
const JwtStrategy = passport.Strategy;
const mongoose = new Mongoose();
const User = mongoose.model("User");
// const;

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secretOrKey,
};

module.exports = (passport: Authenticator) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
