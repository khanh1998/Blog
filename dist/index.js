"use strict";

require("@babel/polyfill");

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./BlogAPI/config/app"));

var _index = _interopRequireDefault(require("./BlogAPI/config/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server = _http["default"].createServer(_app["default"]);

server.listen(_index["default"].PORT, function () {
  console.log("Server is running on ".concat(_index["default"].PORT));
});