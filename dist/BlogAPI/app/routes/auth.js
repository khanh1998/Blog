"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAuthRoute = void 0;

var _auth = require("../api/auth");

var configAuthRoute = function configAuthRoute(app) {
  app.post('/api/v1/login', _auth.login);
};

exports.configAuthRoute = configAuthRoute;