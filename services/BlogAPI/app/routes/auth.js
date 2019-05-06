import { login } from '../api/auth';

export const configAuthRoute = (app) => {
  app.post('/api/v1/login', login);
};
