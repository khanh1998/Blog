import express from 'express';
import cors from 'cors';
import passport from 'passport';
import configPassport from '../config/passport';
import '../config/database';
import { configAuthRoute, configUserRoute, configUploadFileRoute, configArticleRoute, configCommentRoute } from '../app/routes';

const app = express();

app.use(express.static('./services/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(passport.initialize());
configPassport(passport);
configAuthRoute(app);
configUserRoute(app, passport);
configUploadFileRoute(app, passport);
configArticleRoute(app, passport);
configCommentRoute(app, passport);
export default app;
