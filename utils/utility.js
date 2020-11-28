const jwt = require('jsonwebtoken');
const verifyUser = function(req){
  // You need getting data from database
  const username = 'test';
  const password = 'test';
  const mockedUsername = 'test';// req.body.username
  const mockedPassword = 'test';// req.body.password
  if (username === mockedUsername && password === mockedPassword) {
    const result = jwt.verify(req.token, 'secretkey', (err, authData) =>{
      if(err){
        return {
          success: false,
          message: 'Authentication failed! Please check the request',
          err
        };
      } else {
        return {
          success: true,
          authData
        };
      }
    });
    return result;
  } else {
    return {
      success: false,
      message: 'Incorrect username or password'
    };
  }
}
// Store token to local storage
const storeTokenLS = function(token){
    if (typeof localStorage === "undefined" || localStorage === null) {
        let LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    localStorage.setItem('token', token);
}
// Delete token to local storage
const deleteTokenLS = function(){
    localStorage.removeItem('token');
}

function isEmpty(obj){
  return !Object.keys(obj).length;
}

module.exports = {verifyUser,storeTokenLS,deleteTokenLS, isEmpty}
