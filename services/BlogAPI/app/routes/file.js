import {uploadImage} from '../api/file';
import config from '../../config';

export const configUploadFileRoute = (app, passport) => {
  app.post('/api/v1/image', uploadImage);
};
