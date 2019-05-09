'use strict'
import multer from 'multer';

const imageStorage = './services/BlogAPI/public/upload/image';
const acceptedMimeType = [
  ['image/png', '.png'], 
  ['image/jpg', '.jpg'], 
  ['image/jpeg','.jpeg'], 
  ['image/bmp', '.bmp']];
const map = new Map(acceptedMimeType);
const isAccepted = (mimeType) => {
  if (map.get(mimeType))
    return map.get(mimeType);
  return false;
}
function setStorageObject(destination) {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + map.get(file.mimetype));
    },
  });
}

export async function uploadImage(req, res) {
  let storage = setStorageObject(imageStorage);
  
  let imageUpload = multer({
    storage, fileFilter(req, file, cb) {
      if (isAccepted(file.mimetype)) {
        req.body['uploadFileName'] = file.filename;
        cb(null, true);
      }
      else
        cb(null, false);
    }
  });

  let upload = imageUpload.single('photos');
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(500).json({ success: false, message: 'Upload image fail', error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(500).json({ success: false, message: 'Something went wrong', error: err.message });
    }
    // Everything went fine.
    res.json({ success: true, message: 'upload image successfully', file: req.body['uploadFileName']})
  });

}