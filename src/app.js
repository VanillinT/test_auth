const createError = require('http-errors'),
      express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      stylus = require('stylus'),
      app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(stylus.middleware('public'));
app.use(express.static('public'));

// setting static paths for bootstrap, popper, and jquery modules
app.use('/bootstrap', express.static('node_modules/bootstrap'));
app.use('/jquery', express.static('node_modules/jquery'));
app.use('/popper', express.static('node_modules/popper.js'));
app.use('/icons', express.static('public/icons/svg'));
//connecting to mongodb host
const dbConfig = require('./services/db/config.js'),
    mongoose = require('mongoose');
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useFindAndModify:false, useCreateIndex:true })
.then(mongoose=>{
  console.log('Connected to host ' + mongoose.connections[0].host);
})
.catch(err=>console.log('Error occured: ' + err));

//configuring session, passport, and flash library for authentication
const passport = require('passport'),
    session = require('express-session'),
    passportConfig = require('./services/auth/config.js'),
    flash = require('connect-flash');
app.use(session({secret: 'cinnamon bun' , resave: false, saveUninitialized: false}));
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const router = require('./routes/index');
app.use('/', router(passport));


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

module.exports = app;
