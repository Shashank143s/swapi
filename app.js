var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

//Including route files
var auth = require('./routes/auth.js');
var index = require('./routes/index');
var auth = require('./routes/auth.js');
var char = require('./routes/characters');
var app = express();

// Connect to the starwars MongoDB
mongoose.connect('mongodb://localhost:27017/starwars');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//My secret sauce for token generation (do not share)
app.set('superSecret', "LukeIAmYourFather");
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//Setting up the folder which will serve the static files.
app.use(express.static(path.join(__dirname, 'public')));

//Building routes
app.use('/', index);
app.use('/characters', char);
app.use('/auth', auth);

//Setting up response headers for all the routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method === 'Options') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
    return res.status(200).json({});
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next){
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
