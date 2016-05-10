'use strict';

const mongoose = require('mongoose');
const facebook = require('./passport/facebook');
const User = mongoose.model('User');

module.exports = function(passport) {
  passport.serializeUser((user, cb) => cb(null, user.id));
  passport.deserializeUser((id, cb) => User.findOne({ _id: id }).then(u => cb(null, u), e => { console.log(e); cb(e)} ));

  passport.use(facebook);
};

