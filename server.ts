import express  from 'express';
import createError  from 'http-errors';
import helmet  from 'helmet';
import cookieParser  from 'cookie-parser';
import logger  from 'morgan';
import apiRouter  from './router/api';
import articleRouter  from './router/article';

const PORT = 5000;

const app = express();
app.use(helmet());

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);
app.use('/article', articleRouter);


const root = {
  hello: () => {
    return 'Hello world!';
  },
};

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
  res.json({
    message: 'error'
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))


module.exports = app;
