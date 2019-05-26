"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = signup;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUserItself = deleteUserItself;

var _setup = _interopRequireDefault(require("../setup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function signup(_x, _x2) {
  return _signup.apply(this, arguments);
}

function _signup() {
  _signup = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var UserModel, userInfo, userExisted, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            UserModel = _setup["default"].User;
            _context.prev = 1;
            userInfo = {
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
              role: req.body.role,
              bio: req.body.bio
            };
            _context.next = 5;
            return UserModel.findOne({
              $or: [{
                username: req.body.username
              }, {
                email: req.body.email
              }]
            });

          case 5:
            userExisted = _context.sent;

            if (!userExisted) {
              _context.next = 10;
              break;
            }

            res.status(409).json({
              success: false,
              message: 'Username or email is duplicated'
            });
            _context.next = 14;
            break;

          case 10:
            _context.next = 12;
            return UserModel.create(userInfo);

          case 12:
            user = _context.sent;
            res.status(200).json(user);

          case 14:
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](1);
            res.status(500).json({
              success: false,
              message: "Database error: ".concat(_context.t0.message)
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 16]]);
  }));
  return _signup.apply(this, arguments);
}

;

function getUser(_x3, _x4) {
  return _getUser.apply(this, arguments);
}

function _getUser() {
  _getUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var UserModel, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            UserModel = _setup["default"].User;
            _context2.prev = 1;
            _context2.next = 4;
            return UserModel.findOne({
              username: req.params.username
            });

          case 4:
            user = _context2.sent;
            res.json(user);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            res.status(500).send({
              success: false,
              error: _context2.t0
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return _getUser.apply(this, arguments);
}

function updateUser(_x5, _x6) {
  return _updateUser.apply(this, arguments);
}

function _updateUser() {
  _updateUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var UserModel, payload, user, body, samePassword, updated;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            UserModel = _setup["default"].User;
            _context3.prev = 1;
            // get jsonwebtoken payload from request object
            // this payload is included in authorization step
            payload = req.body['jwt_payload'];
            _context3.next = 5;
            return UserModel.findOne({
              username: payload.username
            });

          case 5:
            user = _context3.sent;

            if (!user) {
              _context3.next = 26;
              break;
            }

            body = req.body; // update password

            if (!(body.oldPassword !== undefined)) {
              _context3.next = 17;
              break;
            }

            if (!(body.newPassword !== undefined)) {
              _context3.next = 16;
              break;
            }

            _context3.next = 12;
            return user.comparePassword(body.oldPassword);

          case 12:
            samePassword = _context3.sent;

            if (samePassword) {
              user.password = body.newPassword;
            } else {
              res.json({
                success: false,
                message: 'The password is not correct'
              });
            }

            _context3.next = 17;
            break;

          case 16:
            res.json({
              success: false,
              message: 'Please provide new password'
            });

          case 17:
            // update personal information
            if (body.email !== undefined) user.email = req.body.email;
            if (body.bio !== undefined) user.bio = req.body.bio;
            if (body.avatar !== undefined) user.avatar = req.body.avatar; // save to database

            _context3.next = 22;
            return user.save();

          case 22:
            updated = _context3.sent;
            if (updated) res.json({
              success: true,
              message: "".concat(updated.username, " has been updated successfully"),
              updated: updated
            });else res.status(500).json({
              success: false,
              message: 'cannot save user information'
            });
            _context3.next = 27;
            break;

          case 26:
            res.status(500).json({
              success: false,
              message: 'User is not existed'
            });

          case 27:
            _context3.next = 32;
            break;

          case 29:
            _context3.prev = 29;
            _context3.t0 = _context3["catch"](1);
            res.status(500).json({
              success: false,
              message: 'cannot find user information',
              error: _context3.t0.message
            });

          case 32:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 29]]);
  }));
  return _updateUser.apply(this, arguments);
}

;

function deleteUserItself(_x7, _x8) {
  return _deleteUserItself.apply(this, arguments);
}

function _deleteUserItself() {
  _deleteUserItself = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var UserModel, payload, deleted;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            UserModel = _setup["default"].User;
            _context4.prev = 1;
            payload = req.body['jwt_payload'];
            _context4.next = 5;
            return UserModel.findOneAndDelete({
              username: payload.username
            });

          case 5:
            deleted = _context4.sent;

            if (deleted) {
              res.status(200).json({
                success: true,
                message: "".concat(deleted.username, " has been deleted successfully")
              });
            } else {
              res.status(500).json({
                success: false,
                message: 'cannot delete user information'
              });
            }

            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            res.status(500).json({
              success: false,
              message: 'cannot delete user information',
              error: _context4.t0.message
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  }));
  return _deleteUserItself.apply(this, arguments);
}