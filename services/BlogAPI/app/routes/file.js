import {uploadImage} from '../api/file';
import config from '../../config'

export const configUploadFile = (app, passport) => {
  app.post('/api/v1/image', uploadImage);
}