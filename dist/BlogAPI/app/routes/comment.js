"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCommentRoute = configCommentRoute;

var _config = _interopRequireDefault(require("../../config/"));

var _authorization = _interopRequireDefault(require("../../config/authorization"));

var _comment = require("../api/comment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function configCommentRoute(app, passport) {
  app.get('/api/v1/:uri/comment', passport.authenticate('jwt', _config["default"].session), (0, _authorization["default"])('admin', 'writer', 'reader'), _comment.readComment);
  app.post('/api/v1/:uri/comment', passport.authenticate('jwt', _config["default"].session), (0, _authorization["default"])('admin', 'writer', 'reader'), _comment.createComment);
  app.put('/api/v1/:uri/comment', passport.authenticate('jwt', _config["default"].session), (0, _authorization["default"])('admin', 'writer', 'reader'), _comment.updateComment);
  app["delete"]('/api/v1/:uri/comment', passport.authenticate('jwt', _config["default"].session), (0, _authorization["default"])('admin', 'writer', 'reader'), _comment.deleteComment);
}