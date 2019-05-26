"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComment = createComment;
exports.readComment = readComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;

var _setup = _interopRequireDefault(require("../setup/"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createComment(_x, _x2) {
  return _createComment.apply(this, arguments);
}

function _createComment() {
  _createComment = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var articleModel, article, jwt_payload, body, _id, date, order, newComment, saved;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            articleModel = _setup["default"].Article;
            _context.prev = 1;
            _context.next = 4;
            return articleModel.findOne({
              uri: req.params.uri
            });

          case 4:
            article = _context.sent;

            if (!article) {
              _context.next = 19;
              break;
            }

            jwt_payload = req.body['jwt_payload'];
            body = req.body.body;
            _id = jwt_payload._id;
            date = Date.now();
            order = article.comment.length;
            newComment = {
              order: order,
              author: _id,
              body: body,
              date: date
            };
            article.comment.push(newComment);
            _context.next = 15;
            return article.save();

          case 15:
            saved = _context.sent;

            if (saved) {
              res.json({
                sucess: true,
                message: 'Comment is added successfully',
                newComment: newComment
              });
            }

            _context.next = 20;
            break;

          case 19:
            res.json({
              success: false,
              message: "Article ".concat(req.params.uri, " is not found")
            });

          case 20:
            _context.next = 25;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](1);
            res.json({
              success: false,
              message: 'Database error',
              error: _context.t0
            });

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 22]]);
  }));
  return _createComment.apply(this, arguments);
}

function readComment(_x3, _x4) {
  return _readComment.apply(this, arguments);
}

function _readComment() {
  _readComment = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var articleModel;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            articleModel = _setup["default"].Article;

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _readComment.apply(this, arguments);
}

function updateComment(_x5, _x6) {
  return _updateComment.apply(this, arguments);
}

function _updateComment() {
  _updateComment = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var articleModel;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            articleModel = _setup["default"].Article;

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _updateComment.apply(this, arguments);
}

function deleteComment(_x7, _x8) {
  return _deleteComment.apply(this, arguments);
}

function _deleteComment() {
  _deleteComment = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var articleModel;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            articleModel = _setup["default"].Article;

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _deleteComment.apply(this, arguments);
}