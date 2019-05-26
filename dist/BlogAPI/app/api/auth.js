"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;

var _setup = _interopRequireDefault(require("../setup"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../../config/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function login(_x, _x2) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var UserModel, user, validPassword, payload;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            UserModel = _setup["default"].User;
            _context.prev = 1;
            _context.next = 4;
            return UserModel.findOne({
              username: req.body.username
            });

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 9;
              break;
            }

            res.status(401).send({
              success: false,
              message: 'Authentication failed, user is not found'
            });
            _context.next = 13;
            break;

          case 9:
            _context.next = 11;
            return user.comparePassword(req.body.password);

          case 11:
            validPassword = _context.sent;

            if (validPassword) {
              payload = {
                username: user.username,
                _id: user._id,
                role: user.role
              };

              _jsonwebtoken["default"].sign(payload, _index["default"].SECRET, function (err, token) {
                if (err) res.json({
                  success: false,
                  err: err
                });else {
                  res.json({
                    success: true,
                    message: 'Login successfully',
                    token: token
                  });
                }
              });
            } else {
              res.json({
                success: false,
                message: 'Password or Username is invalid'
              });
            }

          case 13:
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).send({
              success: false,
              message: 'Something went wrong!'
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 15]]);
  }));
  return _login.apply(this, arguments);
}

;