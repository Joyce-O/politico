import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const getToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

export const verifyToken = (request, response, next) => {
  const token = (request.body.token || request.headers.authorization || request.query.token);
  if (!token) {
    return response.status(403)
      .json({
        status: 403,
        error: 'No token provided',
      });
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, authData) => {
    if (error) {
      if (error.message === 'invalid token') {
        return response.status(403)
          .json({
            status: 403,
            error: 'Unauthorized access, supply a valid token.',
          });
      }
    }
    request.authData = authData;
    return next();
  });
};

export const adminPass = (request, response, next) => {
  const userInfo = request.authData.payload;
  if (userInfo.isadmin === false) {
    return response.status(401)
      .json({
        status: 401,
        error: 'Unauthorized access, admin privilege is needed.',
      });
  }
  next();
};
