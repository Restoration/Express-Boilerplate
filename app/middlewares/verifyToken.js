const verifyToken = function(req, res, next){
  const bearerHeader = req.headers['authorization'];
  if(bearerHeader !== 'undefined'){
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    return res.json({
      success: true,
      message: 'Token is not valid'
    });
  }
}
module.exports = {verifyToken}
