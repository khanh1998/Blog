"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

require("../models/user");

require("../models/article");

require("../models/comment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var models = {
  User: _mongoose["default"].model('User'),
  Comment: _mongoose["default"].model('Comment'),
  Article: _mongoose["default"].model('Article')
};
var _default = models;
exports["default"] = _default;