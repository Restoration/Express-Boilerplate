var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var  expressLayouts = require('express-ejs-layouts');


// DatabaseClass
/*
var Database = require('./classes/Database');
var db = new Database();
var table = "test";
db.connect();

db.getData(table);
var obj = { id: '1' , name: "Test" };
db.insertData(table,obj);

var myQuery = { name: "Test" };
var newValues = { $set: {name: "Example" } };
db.updateData(table,myQuery,newValues);

var myQuery = { id: '1' };
db.deleteData(table,myQuery);
*/

// Add package
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');

// Routing
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

// Passport
//----------------------------------------------------------------------
// It needs process before routing define
// Passport needs flash and session package
app.use(flash());
app.use(session({ resave:false,saveUninitialized:false, secret: 'keyboar cat' }));
app.use(passport.initialize());
app.use(passport.session());

// Check authenticated
function isAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}
var sessionCheck = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};
//----------------------------------------------------------------------
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/',sessionCheck,indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(5000, () => console.log('Example app listening on port 5000!'))


module.exports = app;
