const express = require('express');
const createError = require('http-errors');
const helmet = require('helmet')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const PORT = 5000;
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const mailRouter = require('./routes/mail');

const app = express();
app.use(helmet());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', { layout:'layout.ejs' });

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.use('/',indexRouter);
app.use('/api', apiRouter);
app.use('/mail', mailRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))


module.exports = app;
