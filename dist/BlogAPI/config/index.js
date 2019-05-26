"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var devConfig = {
  MONGO_URL: 'mongodb://localhost:27017/BlogAPI',
  PORT: process.env.PORT || 3000,
  HOSTNAME: 'http://localhost'
};
var testConfig = {};
var prodConfig = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 3000,
  HOSTNAME: process.env.HOSTNAME
};
var defaultConfig = {
  SECRET: process.env.SECRET,
  session: {
    session: false
  }
};

function envConfig(env) {
  switch (env) {
    case 'dev':
      return devConfig;

    case 'test':
      return testConfig;

    case 'prod':
      return prodConfig;
  }
}

var _default = _objectSpread({}, defaultConfig, envConfig(process.env.NODE_ENV));

exports["default"] = _default;