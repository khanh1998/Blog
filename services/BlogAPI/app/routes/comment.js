import config from '../../config/';
import permit from '../../config/authorization';
import {createComment, readComment, deleteComment, updateComment} from '../api/comment';

export function configCommentRoute(app, passport) {
  app.get('/api/v1/article/:uri/comment/:id', passport.authenticate('jwt', config.session), permit('admin', 'writer', 'reader'), readComment);
  app.post('/api/v1/article/:uri/comment', passport.authenticate('jwt', config.session), permit('admin', 'writer', 'reader'), createComment);
  app.put('/api/v1/article/:uri/comment/:id', passport.authenticate('jwt', config.session), permit('admin', 'writer', 'reader'), updateComment);
  app.delete('/api/v1/article/:uri/comment/:id', passport.authenticate('jwt', config.session), permit('admin', 'writer', 'reader'), deleteComment);
}