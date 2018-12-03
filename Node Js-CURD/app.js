var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var flash = require('req-flash');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/blog', { useMongoClient: true })
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err));



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
  resave: false,
  saveUninitialized: true
  }));

  app.use(flash());

app.use('/', index);
app.use('/users', users);


app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
module.exports = app;
