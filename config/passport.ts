import { Mongoose } from "mongoose";
import JwtStrategy from "passport-jwt";
import ExtractJwt from "passport-jwt";
const mongoose = new Mongoose();
const User = mongoose.model("User");

const options: { jwtFromRequest?: string; secretOrKey?: string } = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.secretOrKey;

module.exports = (passport) => {
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
