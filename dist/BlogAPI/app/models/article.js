"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var articleSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    minlength: 0,
    maxlength: 200
  },
  uri: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 200
  },
  author: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  createdDate: {
    type: Date,
    required: true,
    "default": Date.now
  },
  updatedDate: {
    type: Date
  },
  status: {
    type: String,
    "enum": ['public', 'hidden', 'draft'],
    required: true
  },
  body: {
    type: String,
    minlength: 150,
    maxlength: 5000
  },
  like: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }],
  //to save _id of user who clicked like button
  tag: [String],
  comment: [_user["default"].schema]
});

var _default = _mongoose["default"].model('Article', articleSchema);

exports["default"] = _default;