import models from '../setup/';

export async function createComment(req, res) {
  const articleModel = models.Article;
  try {
    let article = await articleModel.findOne({ uri: req.params.uri });
    if (article) {
      let jwt_payload = req.body['jwt_payload'];


      let body = req.body.body;
      let _id = jwt_payload._id;
      let date = Date.now();
      let order = article.comment.length;

      let newComment = { order: order, author: _id, body: body, date: date };
      article.comment.push(newComment);
      let saved = await article.save();
      if (saved) {
        res.json({ sucess: true, message: 'Comment is added successfully', newComment, });
      }
    } else {
      res.json({ success: false, message: `Article ${req.params.uri} is not found`, });
    }
  } catch (error) {
    res.json({ success: false, message: 'Database error', error, });
  }
}

export async function readComment(req, res) {
  const articleModel = models.Article;
  try {
    let article = await articleModel.findOne({ uri: req.params.uri });
    if (article) {
      let _id = req.params.id;
      let comment = await article.comment.id(_id);
      if (comment) {
        res.status(200).json(comment);
      }
    } else {
      res.status(400).json({ success: false, message: 'Article doesn\'t existed}', });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database error', error, });
  }
}

export async function updateComment(req, res) {
  const articleModel = models.Article;
  try {
    let article = await articleModel.findOne({ uri: req.params.uri });
    if (article) {
      let _id = req.params.id;
      let comment = await article.comment.id(_id);
      if (comment) {
        comment.body = req.body.body;
        let updatedComment = await comment.save();
        let success = await article.save();
        if (success) {
          res.status(200).json(updatedComment);
        }
      }
    } else {
      res.status(400).json({ success: false, message: 'Article doesn\'t existed}', });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database error', error, });
  }
}

export async function deleteComment(req, res) {
  const articleModel = models.Article;
  try {
    let article = await articleModel.findOne({ uri: req.params.uri });
    if (article) {
      let _id = req.params.id;
      article.comment.id(_id).remove();
      let success = await article.save();
      if (success) {
        res.status(200).json({sucess: true, message: 'Delete comment successfully'});
      }
    } else {
      res.status(400).json({ success: false, message: 'Article doesn\'t existed}', });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database error', error, });
  }
}