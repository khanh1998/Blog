import { signup, getUser } from '../api/user';
import config from '../../config/index';

export const configUserRoute = (app, passport) => {
  app.post('/api/v1/signup', signup);
  app.post('/api/v1/user/:username', passport.authenticate('jwt', config.session), getUser);
};
