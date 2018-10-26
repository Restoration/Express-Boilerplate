var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Database mock
var db={
    users:{
        records:[{
            id:"1",
            username:"user",
            password:"password",
            name:"test"
        }],
        findById(id, cb) {
            process.nextTick(() => {
            var idx = id - 1;
            var record=this.records[idx];
                if (record) {
                    cb(null, record);
                } else {
                    cb(new Error('User ' + id + ' does not exist'));
                }
            });
        },
        findByUsername(username, cb){
            process.nextTick(()=> {
                for (var i = 0, len = this.records.length; i < len; i++) {
                    var record = this.records[i];
                    if (record.username === username) {
                        return cb(null, record);
                    }
                }
                return cb(null, null);
            });
        }
    }
}

// Passport uses what is called a strategy for authentication
passport.use(new LocalStrategy(
    function(username, password, cb) {
        db.users.findByUsername(username, function(err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            if (user.password != password) {
                return cb(null, false);
            }
            return cb(null, user);
        });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});


/* GET login listing. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});


router.post('/',
    passport.authenticate('local', {
        successRefirect: '/',
        failureRedirect: '/login',
        failureFlash: false,
        session: true
    }),
    function(req, res, next){
        res.render('login', { title: 'Login', user_name:req.user && req.user.name || ""  });
    }
);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});



module.exports = router;
