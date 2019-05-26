import models from '../setup';
import { genereateURI } from '../../util/article';

export async function createArticle(req, res) {
  let articleModel = models.Article;

  let _id = req.body['jwt_payload']._id;
  delete req.body['jwt_payload'];

  let { title, body, tag, uri, status } = req.body;
  let article = { title, body, tag, uri, status };
  if (!uri) {
    article.uri = await genereateURI(article);
  }

  article.author = _id;
  article.like = [];
  article.comment = [];
  article.updatedDate = null;
  article.updatedDate = Date.now();
  article.createdDate = Date.now();
  try {
    if (!isValidPublicArticle(article)) {
      res.status(500).json({
        success: false,
        message: 'To publish your article then title, body and uri must not null',
        article,
      });
    }
    let result = await articleModel.create(article);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Save article to database successfully',
        article: result,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Cannot save to database', error, });
  }
}

export async function readArticle(req, res) {
  const articleModel = models.Article;
  try {
    let article = await articleModel.findOne({ uri: req.params.uri });
    if (article) {
      res.status(200).json(article);
    } else {
      res.json({ success: false, message: 'This article is not existed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error happens when accesses to database' });
  }
}

export async function updateArticle(req, res) {
  const articleModel = models.Article;
  try {
    let { title, body, tag, uri, status } = req.body;
    //you must guarantee that your uri is unique before update
    //if not, you will get an error
    let article = await articleModel.findOne({ uri: req.params.uri });
    if (article) {
      if (!isValidPublicArticle(article)) {
        res.status(500).json({ success: false, message: 'To publish your article then title, body and uri must not null' });
      } else {
        article.updatedDate = Date.now();
      }
      article.title = title;
      article.body = body;
      article.tag = tag;
      if (uri)
        article.uri = uri;
      article.status = status;

      let success = await article.save();
      if (success) {
        res.json({ success: true, message: 'Update Successfully!', article: success, })
      }
    } else {
      res.json({ success: false, message: 'This article is not existed' });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error,
    })
  }
}

export async function deleteArticle(req, res) {
  const articleModel = models.Article;
  try {
    let article = await articleModel.findOneAndDelete({ uri: req.params.uri });
    if (article) {
      res.json({ success: true, message: 'Deleted successfully!' });
    }
  } catch (error) {
    res.json({ success: false, message: 'Delete fail!', error, });
  }
}

export async function isExistedURI(req, res) {
  const articleModel = models.Article;
  try {
    let article = await articleModel.findOne({ uri: req.body.uri });
    if (article) {
      res.json({ success: true, message: 'This uri is existed!', valid: false, });
    } else {
      res.json({ success: true, message: 'This uri is not used!', valid: true, });
    }
  } catch (error) {
    res.json({ success: false, message: 'Database error', error, });
  }
}

function isValidPublicArticle(article) {
  if (article.status === 'public') {
    if (!article.title || !article.body || !article.uri)
      return false;
  }
  return true;
}