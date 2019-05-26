"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configArticleRoute = void 0;

var _config = _interopRequireDefault(require("../../config"));

var _authorization = _interopRequireDefault(require("../../config/authorization"));

var _article = require("../api/article");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configArticleRoute = function configArticleRoute(app, passport) {
  app.post('/api/v1/article', passport.authenticate('jwt', _config["default"].session), (0, _authorization["default"])('admin', 'writer'), _article.createArticle);
  app.get('/api/v1/article/:uri', passport.authenticate('jwt', _config["default"].session), _article.readArticle);
  app.put('/api/v1/article/:uri', passport.authenticate('jwt', _config["default"].session), (0, _authorization["default"])('admin', 'writer'), _article.updateArticle);
  app["delete"]('/api/v1/article/:uri', passport.authenticate('jwt', _config["default"].session), (0, _authorization["default"])('admin', 'writer'), _article.deleteArticle);
  app.get('/api/v1/article/:uri/is-existed', passport.authenticate('jwt', _config["default"].session), (0, _authorization["default"])('admin', 'writer'), _article.isExistedURI);
};

exports.configArticleRoute = configArticleRoute;