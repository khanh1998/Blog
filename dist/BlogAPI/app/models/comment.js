"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SubcommentSchema = new _mongoose["default"].Schema({
  order: {
    type: Number,
    required: true
  },
  author: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 2000
  },
  date: {
    type: Date,
    "default": Date.now,
    required: true
  }
});
var commentSchema = new _mongoose["default"].Schema({
  order: {
    type: Number,
    required: true
  },
  author: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 2000
  },
  date: {
    type: Date,
    "default": Date.now,
    required: true
  },
  reply: [SubcommentSchema]
});

var _default = _mongoose["default"].model('Comment', commentSchema);

exports["default"] = _default;