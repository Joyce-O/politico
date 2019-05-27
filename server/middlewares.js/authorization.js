import jwt from 'jsonwebtoken';
import 'dotenv/config';

const generateToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

const verifyToken = (request, response, next) => {
  const token = request.headers.authorization || request.body.token;
  if (!token) {
    return response.status(403)
      .json({
        status: 403,
        error: 'No token supplied',
      });
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, authData) => {
    if (error) {
      if (error.message.includes('signature')) {
        return response.status(403)
          .json({
            status: 403,
            error: 'Your input is not a valid token. Please input a correct one',
          });
      }
      return response.status(403)
        .json({
          message: error,
        });
    }
    request.authData = authData;
    return next();
  });
};

const adminPass = (request, response, next) => {
  const userInfo = request.authData.payload;
  if (userInfo.isadmin !== true) {
    return response.status(401)
      .json({
        status: 403,
        error: 'You need admin privilege to access this endpoint.',
      });
  }
  next();
};

export { generateToken, verifyToken, adminPass };
