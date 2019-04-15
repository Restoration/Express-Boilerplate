const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const expiresTime = '30s';

router.get('/', (req, res) => {
    res.json({ message: 'Hello Express Boilerplate API' });
});
router.post('/api/create',verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        if(err){
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Created post',
                authData
            });
        }
    });
});
router.post('/api/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'test',
        email: 'test@example.com'
    }

    jwt.sign({user},'secretkey', {expiresIn:expiresTime},(err, token) => {
        res.json({
            token
        });
    });
});

// Verify Token
function verifyToken(req, res, next){
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
        res.sendStatus(403);
    }
}



module.exports = router;
