import express from 'express';
import cors from 'cors';
import passport from 'passport';
import configPassport from '../config/passport';
import '../config/database';
import { configAuthRoute, configUserRoute, configUploadFile } from '../app/routes';

const app = express();

app.use(express.static('../public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(passport.initialize());
configPassport(passport);
configAuthRoute(app);
configUserRoute(app, passport);
configUploadFile(app, passport);
export default app;
