var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var connectflash=require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/users');


var routes = require('./routes/index');
var user = require('./routes/users');
var RepoRoutes = require('./routes/RepoRoutes');



//var hello=require('./routes/hello');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("../webpack.config");
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();
var compiler = webpack(webpackConfig);


app.use(webpackDevMiddleware(compiler, {
 publicPath: webpackConfig.output.publicPath,
   stats: {colors: true}, // Same as `output.publicPath` in most cases.
   quiet: true,
   noInfo: true,
   host: '0.0.0.0',
   watchOptions:{
     aggregateTimeout:300,
     poll:1000
   }
 }));

app.use(webpackHotMiddleware(compiler, {
 log: console.log,
}))










var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/gitrepo");
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){

  console.log("connected to mongodbsuccessfully");
});

passport.serializeUser(function(user, done) {
  console.log("serial");
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserial");
  User.findById(id,function(err,user){
    done(null, user);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("tyyyy");
    process.nextTick(function () {
      User.findOne({'username':username},
        function(err, user) {
          if (err) {console.log("err"); return done(err); }
          if (!user) { 
            console.log("user not");
            return done(null, false); }
            if (user.password != password) { console.log("password");
            return done(null, false); }
            console.log("ssssss"+user);
            return done(null, user);
          });
    });
  }
  ));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'accesskey'}));

app.use(passport.initialize());
app.use(passport.session()); 


app.use('/', routes);
app.use('/users', user);
app.use('/repos', RepoRoutes);


//app.use('/hello', hello);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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







module.exports = app;
