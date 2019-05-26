"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _assert = require("assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default() {
  for (var _len = arguments.length, allowed = new Array(_len), _key = 0; _key < _len; _key++) {
    allowed[_key] = arguments[_key];
  }

  var isAllowed = function isAllowed(role) {
    return allowed.indexOf(role) > -1;
  };

  return function (req, res, next) {
    var token = req.headers['authorization'].split(' ')[1];

    _jsonwebtoken["default"].verify(token, _config["default"].SECRET, function (err, decoded) {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'cannot verify the jsonwebtoken'
        });
      }

      if (isAllowed(decoded.role)) {
        // include payload into request object and pass it to next middleware
        req.body['jwt_payload'] = decoded; // next middleware

        next();
      } else {
        res.status(401).json({
          success: _assert.fail,
          message: 'unauthorized'
        });
      }
    });
  };
}