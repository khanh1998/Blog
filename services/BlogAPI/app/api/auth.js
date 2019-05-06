import models from '../setup';
import jwt from 'jsonwebtoken';
import config from '../../config/index';

export async function login(req, res) {
  const UserModel = models.User;
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user)
      res.status(401).send({
        success: false,
        message: 'Authentication failed, user is not found',
      });
    else {
      let validPassword = await user.comparePassword(req.body.password);
      if (validPassword) {
        let payload = {
          username: user.username,
          role: user.role,
          bio: user.bio
        };
        jwt.sign(payload, config.SECRET, (err, token) => {
            if (err)
              res.json( {success: false, err, } );
            else {
              res.json({
                success: true,
                message: 'Login successfully',
                token,
              });
            }
          });

      } else {
        res.json( {success: false, message: "Password or Username is invalid"} );
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