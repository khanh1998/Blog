"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createArticle = createArticle;
exports.readArticle = readArticle;
exports.updateArticle = updateArticle;
exports.deleteArticle = deleteArticle;
exports.isExistedURI = isExistedURI;

var _setup = _interopRequireDefault(require("../setup"));

var _article = require("../../util/article");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createArticle(_x, _x2) {
  return _createArticle.apply(this, arguments);
}

function _createArticle() {
  _createArticle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var articleModel, _id, _req$body, title, body, tag, uri, status, article, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            articleModel = _setup["default"].Article;
            _id = req.body['jwt_payload']._id;
            delete req.body['jwt_payload'];
            _req$body = req.body, title = _req$body.title, body = _req$body.body, tag = _req$body.tag, uri = _req$body.uri, status = _req$body.status;
            article = {
              title: title,
              body: body,
              tag: tag,
              uri: uri,
              status: status
            };

            if (uri) {
              _context.next = 9;
              break;
            }

            _context.next = 8;
            return (0, _article.genereateURI)(article);

          case 8:
            article.uri = _context.sent;

          case 9:
            article.author = _id;
            article.like = [];
            article.comment = [];
            article.updatedDate = null;
            article.updatedDate = Date.now();
            article.createdDate = Date.now();
            _context.prev = 15;

            if (!isValidPublicArticle(article)) {
              res.status(500).json({
                success: false,
                message: 'To publish your article then title, body and uri must not null',
                article: article
              });
            }

            _context.next = 19;
            return articleModel.create(article);

          case 19:
            result = _context.sent;

            if (result) {
              res.status(200).json({
                success: true,
                message: 'Save article to database successfully',
                article: result
              });
            }

            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](15);
            res.status(500).json({
              success: false,
              message: 'Cannot save to database',
              error: _context.t0
            });

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[15, 23]]);
  }));
  return _createArticle.apply(this, arguments);
}

function readArticle(_x3, _x4) {
  return _readArticle.apply(this, arguments);
}

function _readArticle() {
  _readArticle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var articleModel, article;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            articleModel = _setup["default"].Article;
            _context2.prev = 1;
            _context2.next = 4;
            return articleModel.findOne({
              uri: req.params.uri
            });

          case 4:
            article = _context2.sent;

            if (article) {
              res.status(200).json(article);
            } else {
              res.json({
                success: false,
                message: 'This article is not existed'
              });
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            res.status(500).json({
              success: false,
              message: 'Error happens when accesses to database'
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return _readArticle.apply(this, arguments);
}

function updateArticle(_x5, _x6) {
  return _updateArticle.apply(this, arguments);
}

function _updateArticle() {
  _updateArticle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var articleModel, _req$body2, title, body, tag, uri, status, article, success;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            articleModel = _setup["default"].Article;
            _context3.prev = 1;
            _req$body2 = req.body, title = _req$body2.title, body = _req$body2.body, tag = _req$body2.tag, uri = _req$body2.uri, status = _req$body2.status; //you must guarantee that your uri is unique before update
            //if not, you will get an error

            _context3.next = 5;
            return articleModel.findOne({
              uri: req.params.uri
            });

          case 5:
            article = _context3.sent;

            if (!article) {
              _context3.next = 19;
              break;
            }

            if (!isValidPublicArticle(article)) {
              res.status(500).json({
                success: false,
                message: 'To publish your article then title, body and uri must not null'
              });
            } else {
              article.updatedDate = Date.now();
            }

            article.title = title;
            article.body = body;
            article.tag = tag;
            article.uri = uri;
            article.status = status;
            _context3.next = 15;
            return article.save();

          case 15:
            success = _context3.sent;

            if (success) {
              res.json({
                success: true,
                message: 'Update Successfully!',
                article: success
              });
            }

            _context3.next = 20;
            break;

          case 19:
            res.json({
              success: false,
              message: 'This article is not existed'
            });

          case 20:
            _context3.next = 25;
            break;

          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](1);
            res.status(500).json({
              success: false,
              message: 'Something went wrong!',
              error: _context3.t0
            });

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 22]]);
  }));
  return _updateArticle.apply(this, arguments);
}

function deleteArticle(_x7, _x8) {
  return _deleteArticle.apply(this, arguments);
}

function _deleteArticle() {
  _deleteArticle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var articleModel, article;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            articleModel = _setup["default"].Article;
            _context4.prev = 1;
            _context4.next = 4;
            return articleModel.findByIdAndDelete({
              uri: req.params.uri
            });

          case 4:
            article = _context4.sent;

            if (article) {
              res.json({
                success: true,
                message: 'Deleted successfully!'
              });
            }

            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            res.json({
              success: false,
              message: 'Delete fail!'
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return _deleteArticle.apply(this, arguments);
}

function isExistedURI(_x9, _x10) {
  return _isExistedURI.apply(this, arguments);
}

function _isExistedURI() {
  _isExistedURI = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var articleModel, article;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            articleModel = _setup["default"].Article;
            _context5.prev = 1;
            _context5.next = 4;
            return articleModel.findOne({
              uri: req.body.uri
            });

          case 4:
            article = _context5.sent;

            if (article) {
              res.json({
                success: true,
                message: 'This uri is existed!',
                valid: false
              });
            } else {
              res.json({
                success: true,
                message: 'This uri is not used!',
                valid: true
              });
            }

            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            res.json({
              success: false,
              message: 'Database error',
              error: _context5.t0
            });

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return _isExistedURI.apply(this, arguments);
}

function isValidPublicArticle(article) {
  if (article.status === 'public') {
    if (!article.title && !article.body && !article.uri) return false;
  }

  return true;
}