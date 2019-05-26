"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configUploadFileRoute = void 0;

var _file = require("../api/file");

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configUploadFileRoute = function configUploadFileRoute(app, passport) {
  app.post('/api/v1/image', _file.uploadImage);
};

exports.configUploadFileRoute = configUploadFileRoute;