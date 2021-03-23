import { Authenticator } from "passport";
import { StrategyOptions, VerifyCallback } from "passport-jwt";
import passport = require("passport-jwt");
const User = require("../models/User");
const ExtractJwt = passport.ExtractJwt;
const JwtStrategy = passport.Strategy;

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secretOrKey,
};

export default (passport: { use: (arg0: passport.Strategy) => void }) => {
  passport.use(
    new JwtStrategy(
      options,
      (jwt_payload, done): VerifyCallback => {
        return User.findById(jwt_payload.id)
          .then((user: any) => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch((err: any) => console.log(err));
      }
    )
  );
};
