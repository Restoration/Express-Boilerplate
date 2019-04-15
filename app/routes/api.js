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


router.post('/register', (req, res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    userObj = {
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    }
    // Call Database class register method
    DB.register(userObj,(err, user) => {
        if (err){
            res.sendStatus(500);
        }
        // 86400 = 24h
        jwt.sign({user},'secretkey', { expiresIn: 86400 }, (err, token) => {
            res.json({
                token
            });
        });
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
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid){
        res.sendStatus(403);
    }
    jwt.sign({user},'secretkey', { expiresIn: 86400 }, (err, token) => {
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
