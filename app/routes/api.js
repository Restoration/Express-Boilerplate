const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello Express Boilerplate API' });
});
router.post('/create',verifyToken, (req, res) => {
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

router.post('/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'test',
        email: 'test@example.com',
        password: '',
    }
    // Get the token
    jwt.sign({user},'secretkey', { expiresIn: 86400 }, (err, token) => {
        storeTokenLS(token);
        res.json({
            token
        });
    });
});

router.get('/logout', (req, res) => {
    deleteTokenLS();
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
// Store token to local storage
function storeTokenLS(token){
    if (typeof localStorage === "undefined" || localStorage === null) {
        let LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    localStorage.setItem('token', token);
}
// Delete token to local storage
function deleteTokenLS(){
    localStorage.removeItem('token');
}

module.exports = router;
