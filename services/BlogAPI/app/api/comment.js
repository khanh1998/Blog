import models from '../setup/';

export async function createComment(req, res) {
  const articleModel = models.Article;
  try {
    let article = await articleModel.findOne({uri: req.params.uri});
    if (article) {
      let jwt_payload = req.body['jwt_payload'];

      let body = req.body.body;
      let _id = jwt_payload._id;
      let date = Date.now();
      let order = article.comment.length;

      let newComment = {order: order, author: _id, body: body, date: date};
      article.comment.push(newComment);
      let saved = await article.save();
      if (saved) {
        res.json({sucess: true, message: 'Comment is added successfully', newComment, });
      }
    } else {
      res.json({success: false, message: `Article ${req.params.uri} is not found`, });
    }
  } catch (error) {
    res.json({success: false, message: 'Database error', error, });
  }
}

export async function readComment(req, res) {
  const articleModel = models.Article;
}

export async function updateComment(req, res) {
  const articleModel = models.Article;
}

export async function deleteComment(req, res) {
  const articleModel = models.Article;
}