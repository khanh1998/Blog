import { signup, getUser, updateUser, deleteUserItself } from '../api/user';
import config from '../../config/index';
import permit from '../../config/authorization';

export const configUserRoute = (app, passport) => {
  app.post('/api/v1/signup', signup);
  app.get('/api/v1/user/:username', getUser);
  app.put('/api/v1/user/', passport.authenticate('jwt', config.session), permit('reader', 'writer', 'admin'), updateUser);
  app.delete('/api/v1/user', passport.authenticate('jwt', config.session), permit('reader', 'writer'), deleteUserItself)
};
