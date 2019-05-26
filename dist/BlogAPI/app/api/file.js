'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = uploadImage;
exports.getImage = getImage;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var imageStorage = './services/public/upload/image';
var acceptedMimeType = [['image/png', '.png'], ['image/jpg', '.jpg'], ['image/jpeg', '.jpeg'], ['image/bmp', '.bmp']];
var map = new Map(acceptedMimeType);

var isAccepted = function isAccepted(mimeType) {
  if (map.get(mimeType)) return map.get(mimeType);
  return false;
};

function setStorageObject(_destination) {
  return _multer["default"].diskStorage({
    destination: function destination(req, file, cb) {
      cb(null, _destination);
    },
    filename: function filename(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + map.get(file.mimetype));
    }
  });
}

function uploadImage(_x, _x2) {
  return _uploadImage.apply(this, arguments);
}

function _uploadImage() {
  _uploadImage = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var storage, imageUpload, upload;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            storage = setStorageObject(imageStorage);
            imageUpload = (0, _multer["default"])({
              storage: storage,
              fileFilter: function fileFilter(req, file, cb) {
                if (isAccepted(file.mimetype)) {
                  req.body['uploadFileName'] = file.filename;
                  cb(null, true);
                } else cb(null, false);
              }
            });
            upload = imageUpload.single('photos');
            upload(req, res, function (err) {
              if (err instanceof _multer["default"].MulterError) {
                // A Multer error occurred when uploading.
                res.status(500).json({
                  success: false,
                  message: 'Upload image fail',
                  error: err.message
                });
              } else if (err) {
                // An unknown error occurred when uploading.
                res.status(500).json({
                  success: false,
                  message: 'Something went wrong',
                  error: err.message
                });
              } // Everything went fine.


              res.json({
                success: true,
                message: 'upload image successfully',
                file: req.body['uploadFileName']
              });
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _uploadImage.apply(this, arguments);
}

function getImage(_x3, _x4) {
  return _getImage.apply(this, arguments);
}

function _getImage() {
  _getImage = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getImage.apply(this, arguments);
}