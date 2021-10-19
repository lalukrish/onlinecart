"use strict";

var path = require('path');

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var session = require('express-session');

var MongoDBStore = require('connect-mongodb-session')(session);

var csrf = require('csurf');

var flash = require('connect-flash');

var errorController = require('./controllers/error');

var User = require('./models/user');

var MONGODB_URI = "mongodb+srv://user_user-_123:user_user-_123@cluster0.aqzbj.mongodb.net/myFirstDatabase";
var app = express();
var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
var csrfProtection = csrf();
app.set('view engine', 'ejs');
app.set('views', 'views');

var adminRoutes = require('./routes/admin');

var shopRoutes = require('./routes/shop');

var authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, 'public')));
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store
}));
app.use(csrfProtection);
app.use(flash());
app.use(function (req, res, next) {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id).then(function (user) {
    req.user = user;
    next();
  })["catch"](function (err) {
    return console.log(err);
  });
});
app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);
mongoose.connect(MONGODB_URI).then(function (result) {
  app.listen(3000);
})["catch"](function (err) {
  console.log(err);
});