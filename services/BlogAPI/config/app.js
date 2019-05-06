import express from 'express';
import cors from 'cors';
import passport from 'passport';
import configPassport from '../config/passport';
import '../config/database';
import { configAuthRoute, configUserRoute } from '../app/routes';
const app = express();

app.use(express.static('.'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(passport.initialize());
configPassport(passport);
configUserRoute(app, passport);
configAuthRoute(app);
export default app;
