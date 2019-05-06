import models from '../setup';
import jwt from 'jsonwebtoken';
import config from '../../config/index';

export async function login (req, res) {
  const UserModel = models.User;
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user)
      res.status(401).send({
        success: false,
        message: 'Authentication failed, user is not found',
      });
    else {
      let valid = await UserModel.comparePassword(req.body.password);

      
      if (valid) {
        const token = await jwt.sign(req.body.username, config.SECRET);
        res.json({
          success: true,
          message: 'Login successfully',
          token,
        });
      }
    }
  } catch (error) {
    console.log(error);
    
    res.status(500).send({
      success: false,
      message: 'Something went wrong!',
    });
  }
};
