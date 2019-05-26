"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configUserRoute = void 0;

var _user = require("../api/user");

var _index = _interopRequireDefault(require("../../config/index"));

var _authorization = _interopRequireDefault(require("../../config/authorization"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configUserRoute = function configUserRoute(app, passport) {
  app.post('/api/v1/signup', _user.signup);
  app.get('/api/v1/user/:username', _user.getUser);
  app.put('/api/v1/user/', passport.authenticate('jwt', _index["default"].session), (0, _authorization["default"])('reader', 'writer', 'admin'), _user.updateUser);
  app["delete"]('/api/v1/user', passport.authenticate('jwt', _index["default"].session), (0, _authorization["default"])('reader', 'writer'), _user.deleteUserItself);
};

exports.configUserRoute = configUserRoute;