import models from '../setup';
import config from '../../config/index';

export async function signup (req, res) {
  const UserModel = models.User;
  try {
    let userInfo = { 
      username: req.body.username, 
      email: req.body.email, 
      password: req.body.password, 
      role: req.body.role, 
      bio: req.body.bio 
    };
    let userExisted = await UserModel.findOne(
      {
        $or: [
          {username: req.body.username}, 
          {email: req.body.email}
        ]
      });
    if (userExisted) {
      res.status(409).json({success: false, message: 'Username or email is duplicated'})
    } else {
      let user = await UserModel.create(userInfo);
      res.status(200).json(user);
    }
    
  } catch (error) {
    res.status(500).json({success: false, message: `Database error: ${error.message}`})
  }
}