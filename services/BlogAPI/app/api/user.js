import models from '../setup';

export async function signup(req, res) {
  const UserModel = models.User;
  try {
    let userInfo = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      bio: req.body.bio,
    };

    let userExisted = await UserModel.findOne(
      {
        $or: [
          { username: req.body.username },
          { email: req.body.email },
        ],
      });
    if (userExisted) {
      res.status(409).json({ success: false, message: 'Username or email is duplicated' });
    } else {
      let user = await UserModel.create(userInfo);
      res.status(200).json(user);
    }

  } catch (error) {
    res.status(500).json({ success: false, message: `Database error: ${error.message}` });
  }
};

export async function getUser(req, res) {
  const UserModel = models.User;
  try {
    let user = await UserModel.findOne({ username: req.params.username });
    res.json(user);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
}

export async function updateUser(req, res) {
  const UserModel = models.User;
  try {
    // get jsonwebtoken payload from request object
    // this payload is included in authorization step
    let payload = req.body['jwt_payload'];

    let user = await UserModel.findOne({ username: payload.username });

    if (user) {
      let body = req.body;
      
      //update password
      if (body.oldPassword !== undefined) {
        if (body.newPassword !== undefined) {
          let samePassword = await user.comparePassword(body.oldPassword);
          if (samePassword) {
            user.password = body.newPassword;
          } else {
            res.json({ success: false, message: 'The password is not correct' });
          }
        } else {
          res.json({ success: false, message: 'Please provide new password' });
        }
      }

      //update personal information
      if (body.email !== undefined)
        user.email = req.body.email;
      if (body.bio !== undefined)
        user.bio = req.body.bio;
      if (body.avatar !== undefined)
        user.avatar = req.body.avatar;

      //save to database
      let updated = await user.save();
      if (updated)
        res.json({ success: true, message: `${updated.username} has been updated successfully`, updated, });
      else
        res.status(500).json({ success: false, message: 'cannot save user information', error: error.message, });
    } else {
      res.status(500).json({ success: false, message: 'User is not existed', error: error.message, });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'cannot find user information', error: error.message, });
  }
};

export async function deleteUserItself(req, res) {
  const UserModel = models.User;
  try {
    let payload = req.body['jwt_payload'];
    let deleted = await UserModel.findOneAndDelete({ username: payload.username });
    if (deleted) {
      res.status(200).json({ success: true, message: `${deleted.username} has been deleted successfully`, });
    } else {
      res.status(500).json({ success: false, message: 'cannot delete user information', error: error.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'cannot delete user information', error: error.message });
  }
}
