import { login } from '../api/auth';

export const configLoginRoute = (app) => {
  app.post('/api/v1/login', login);
};
