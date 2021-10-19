"use strict";

var bcrypt = require('bcryptjs');

var User = require('../models/user');

exports.getLogin = function (req, res, next) {
  var message = req.flash('error');

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = function (req, res, next) {
  var message = req.flash('error');

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({
    email: email
  }).then(function (user) {
    if (!user) {
      req.flash('error', 'invalid email or password');
      return res.redirect('/login');
    }

    bcrypt.compare(password, user.password).then(function (doMatch) {
      if (doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(function (err) {
          console.log(err);
          res.redirect('/');
        });
      }

      req.flash('error', 'invalid email or password');
      res.redirect('/login');
    })["catch"](function (err) {
      console.log(err);
      res.redirect('/login');
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.postSignup = function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  User.findOne({
    email: email
  }).then(function (userDoc) {
    if (userDoc) {
      req.flash('error', 'E-mail exists already,please pick a different one.');
      return res.redirect('/signup');
    }

    return bcrypt.hash(password, 12).then(function (hashedPassword) {
      var user = new User({
        email: email,
        password: hashedPassword,
        cart: {
          items: []
        }
      });
      return user.save();
    });
  }).then(function (result) {
    res.redirect('/');
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.postLogout = function (req, res, next) {
  req.session.destroy(function (err) {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = function (req, res, next) {
  var message = req.flash('error');

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset',
    errorMessage: message
  });
};