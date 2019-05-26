"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _passport = _interopRequireDefault(require("passport"));

var _passport2 = _interopRequireDefault(require("../config/passport"));

require("../config/database");

var _routes = require("../app/routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"]["static"]('./services/public'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.use(_passport["default"].initialize());
(0, _passport2["default"])(_passport["default"]);
(0, _routes.configAuthRoute)(app);
(0, _routes.configUserRoute)(app, _passport["default"]);
(0, _routes.configUploadFileRoute)(app, _passport["default"]);
(0, _routes.configArticleRoute)(app, _passport["default"]);
(0, _routes.configCommentRoute)(app, _passport["default"]);
var _default = app;
exports["default"] = _default;