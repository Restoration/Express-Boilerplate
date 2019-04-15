const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello Express Boilerplate API' });
});
router.post('/create',verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        console.log(err);
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
router.post('/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'test',
        email: 'test@example.com'
    }
    jwt.sign({user},'secretkey', { expiresIn: '1h' }, (err, token) => {
        res.json({
            token
        });
    });
});

// Verify Token
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader !== 'undefined'){
        req.token = bearerHeader;
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
        res.render('error');
    }
}

module.exports = router;
