"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Minimum length of username is 3 characters'],
    maxlength: [50, 'Maximum length of username is 50 characters'],
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Minimum length of email is 3 characters'],
    maxlength: [50, 'Maximum length of email is 200 characters']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    "enum": ['admin', 'reader', 'writer']
  },
  bio: {
    type: String,
    maxlength: [300, 'Maximum length of bio is 300 characters']
  },
  avatar: {
    type: String
  }
});

function hashPassword(password) {
  _bcrypt["default"].genSalt(10, function (err, salt) {
    if (err) throw err;

    _bcrypt["default"].hash(password, salt, function (err, encrypted) {
      if (err) throw err;
      return encrypted;
    });
  });
}

userSchema.pre('save', function (next) {
  var _this = this;

  try {
    if (this.isModified('password') || this.isNew) {
      hashPassword(this.password, function (encrypted) {
        _this.password = encrypted;
      });
    }

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(password) {
    var match;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcrypt["default"].compare(password, this.password);

          case 2:
            match = _context.sent;
            return _context.abrupt("return", match);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = _mongoose["default"].model('User', userSchema);

exports["default"] = _default;