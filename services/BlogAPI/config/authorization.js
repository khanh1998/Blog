import jwt from 'jsonwebtoken';
import config from '../config';
import { fail } from 'assert';

export default function(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1;

  return (req, res, next) => {
    let token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        res.status(500).json({success: false, message: 'cannot verify the jsonwebtoken'});
      }
      if (isAllowed(decoded.role)) {
        // include payload into request object and pass it to next middleware
        req.body['jwt_payload'] = decoded;
        // next middleware
        next();
      } else {
        res.status(401).json({success: fail, message: 'unauthorized'});
      }
    });
  };
}
