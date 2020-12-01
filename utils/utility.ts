import jwt from 'jsonwebtoken';

interface VerifyUserResponse {
  success: boolean;
  message: string;
  authData?: any;
  err?: any;
}

export const verifyUser = (req): VerifyUserResponse => {
  // You need getting data from database
  const username = 'test';
  const password = 'test';
  const mockedUsername = 'test';// req.body.username
  const mockedPassword = 'test';// req.body.password
  if (username === mockedUsername && password === mockedPassword) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        return {
          success: false,
          message: 'Authentication failed! Please check the request',
          err
        };
      } else {
        return {
          success: true,
          message: 'success',
          authData
        };
      }
    });
  } else {
    return {
      success: false,
      message: 'Incorrect username or password'
    };
  }
};
export function isEmpty(obj) {
  return !Object.keys(obj).length;
}

module.exports = { verifyUser, isEmpty };
