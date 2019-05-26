"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _setup = _interopRequireDefault(require("../app/setup"));

var _config = _interopRequireDefault(require("../config"));

var _passportJwt = _interopRequireDefault(require("passport-jwt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(passport) {
  var ExtractJWT = _passportJwt["default"].ExtractJwt;
  var Strategy = _passportJwt["default"].Strategy;
  var UserModel = _setup["default"].User;
  var options = {
    secretOrKey: _config["default"].SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  };
  passport.use(new Strategy(options, function (jwt_payload, done) {
    UserModel.findOne({
      username: jwt_payload.username
    }, function (err, user) {
      if (err) return done(err, false);
      if (user) return done(null, user);else return done(null, false);
    });
  }));
};

exports["default"] = _default;