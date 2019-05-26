"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("../config/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].Promise = global.Promise;

try {
  console.log(_index["default"]);

  _mongoose["default"].connect(_index["default"].MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });
} catch (err) {
  _mongoose["default"].createConnection(_index["default"].MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });
}

var connection = _mongoose["default"].connection;
connection.on('error', function (err) {
  return console.log("Connection to database fail: ".concat(err));
});
connection.on('connected', function () {
  return console.log('Connect to database successfully');
});
connection.on('disconnected', function () {
  return console.log('Disconnected from database');
});
connection.once('SIGINT', function () {
  return console.log('Terminated database');
});