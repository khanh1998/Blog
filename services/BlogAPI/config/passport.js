import models from '../app/setup';
import config from '../config';
import PassportJWT from 'passport-jwt';

export default (passport) => {
  const ExtractJWT = PassportJWT.ExtractJwt;
  const Strategy = PassportJWT.Strategy;

  const UserModel = models.User;
  const options = {
    secretOrKey: config.SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  };
  passport.use(new Strategy(options, (jwt_payload, done) => {
    UserModel.findOne({ username: jwt_payload.username }, (err, user) => {
      if (err)
        return done(err, false);
      if (user)
        return done(null, user);
      else
        return done(null, false);
    });
  }));

};
