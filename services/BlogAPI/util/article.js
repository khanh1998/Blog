import models from '../app/setup';

export async function genereateURI(article) {
  let title = article.title;
  let body = article.body;
  let uri;
  //create
  if (title) {
    uri = await createUriFromTitle(title);
  } else if (body) {
    uri = await createUriFromBody(body);
  } else {
    uri = 'blog-post-' + Date.now();
  }
  console.log(uri);

  return uri;
}
async function createUriFromTitle(title) {
  let regexSpace = / /gi;
  let uri = title.replace(regexSpace, '-');
  let existed = await isExistedURI(uri);
  if (!existed)
    return uri;
  else {
    uri += '-' + Date.now();
    return uri;
  }
}
async function createUriFromBody(body) {
  const MAX_URI = 50;
  let regexSpace = / /gi;
  let regexNoncharacter = /\W/g;
  let regexReturn = /\r\n/g;
  let uri;
  body = body.
    replace(regexReturn, ''). //delete carriage return
    replace(regexNoncharacter, '-'). //delete any noncharacter
    replace(regexSpace, '-'); //replace white space with -
  console.log(body);
  if (body.length > MAX_URI)
    uri = body.slice(0, MAX_URI);
  else
    uri = body.slice(0, body.length - 1);

  let duplicated = await isExistedURI(uri);
  if (duplicated) {
    uri += '-' + Date.now();
  }
  return uri;
}
async function isExistedURI(uri) {
  try {
    let articleModel = models.Article;
    let existed = await articleModel.findOne({ uri: uri });
    if (existed)
      return true;
  } catch (error) {
    console.log({ message: 'Error happens when check whether a URI of article exist or not', error, });
    throw error;
  }
  return false;
}