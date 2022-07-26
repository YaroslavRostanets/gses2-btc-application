const fs = require('fs');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const apiRouter = require('./routes/api');
const app = express();

app.use(logger('dev', {
  stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use('/docs', express.static('docs'));
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
