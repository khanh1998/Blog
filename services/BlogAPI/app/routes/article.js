import config from '../../config';
import permit from '../../config/authorization';
import { createArticle, readArticle } from '../api/article';
import { deleteArticle, updateArticle, isExistedURI } from '../api/article';

export const configArticleRoute = (app, passport) => {
  app.post('/api/v1/article',
    passport.authenticate('jwt', config.session),
    permit('admin', 'writer'),
    createArticle
  );
  app.get('/api/v1/article/:uri',
    passport.authenticate('jwt', config.session),
    readArticle
  );
  app.put('/api/v1/article/:uri',
    passport.authenticate('jwt', config.session),
    permit('admin', 'writer'),
    updateArticle
  );
  app.delete('/api/v1/article/:uri',
    passport.authenticate('jwt', config.session),
    permit('admin', 'writer'),
    deleteArticle
  );
  app.get('/api/v1/article/:uri/is-existed',
    passport.authenticate('jwt', config.session),
    permit('admin', 'writer'),
    isExistedURI
  );
}