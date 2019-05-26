"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genereateURI = genereateURI;

var _setup = require("../app/setup");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function genereateURI(_x) {
  return _genereateURI.apply(this, arguments);
}

function _genereateURI() {
  _genereateURI = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(article) {
    var title, body, uri;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            title = article.title;
            body = article.body;

            if (!title) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return createUriFromTitle(title);

          case 5:
            uri = _context.sent;
            _context.next = 15;
            break;

          case 8:
            if (!body) {
              _context.next = 14;
              break;
            }

            _context.next = 11;
            return createUriFromBody(body);

          case 11:
            uri = _context.sent;
            _context.next = 15;
            break;

          case 14:
            uri = 'blog-post-' + Date.now();

          case 15:
            console.log(uri);
            return _context.abrupt("return", uri);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _genereateURI.apply(this, arguments);
}

function createUriFromTitle(_x2) {
  return _createUriFromTitle.apply(this, arguments);
}

function _createUriFromTitle() {
  _createUriFromTitle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(title) {
    var regexSpace, uri, existed;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            regexSpace = / /gi;
            uri = title.replace(regexSpace, '-');
            _context2.next = 4;
            return isExistedURI(uri);

          case 4:
            existed = _context2.sent;

            if (existed) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", uri);

          case 9:
            uri += '-' + Date.now();
            return _context2.abrupt("return", uri);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createUriFromTitle.apply(this, arguments);
}

function createUriFromBody(_x3) {
  return _createUriFromBody.apply(this, arguments);
}

function _createUriFromBody() {
  _createUriFromBody = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(body) {
    var length, regexSpace, regexNoncharacter, uri;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            length = body.length;
            regexSpace = / /gi;
            regexNoncharacter = /[^\w]/gi;
            if (length > 50) uri = body.slice(50);else uri = body.slice(length - 1);
            uri.replace(regexNoncharacter, ''). //delete any noncharacter
            replace(regexSpace, '-'); //replace white space with -

            _context3.next = 7;
            return isExistedURI(uri);

          case 7:
            if (!_context3.sent) {
              _context3.next = 9;
              break;
            }

            uri += '-' + Date.now();

          case 9:
            return _context3.abrupt("return", uri);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _createUriFromBody.apply(this, arguments);
}

function isExistedURI(_x4) {
  return _isExistedURI.apply(this, arguments);
}

function _isExistedURI() {
  _isExistedURI = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(uri) {
    var existed;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _setup.articleModel.Article.findOne({
              uri: uri
            });

          case 3:
            existed = _context4.sent;

            if (!existed) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", true);

          case 6:
            _context4.next = 12;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            console.log({
              message: 'Error happens when check whether a URI of article exist or not',
              error: _context4.t0
            });
            throw _context4.t0;

          case 12:
            return _context4.abrupt("return", false);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return _isExistedURI.apply(this, arguments);
}