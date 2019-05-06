import { signup } from '../api/user';

export const configSignupRoute = (app) => {
  app.post('/api/v1/signup', signup);
};
