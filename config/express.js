'use strict';

const path = require('path');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const config = require('./config');
const routes = require('../routes/index');
const users  = require('../routes/users');
const auth   = require('../routes/auth');


module.exports = function(app, passport) {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'thisissomelongsecret',
    store: new mongoStore({
      url: config.db,
      collection: 'sessions'
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/', routes);
  app.use('/users', users);
  app.use('/auth', auth);
};
