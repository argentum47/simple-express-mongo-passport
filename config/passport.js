'use strict';

const facebook = require('./passport/facebook');

module.exports = function(passport) {
  passport.serializeUser((user, cb) => cb(null, user.id));
  passport.deserializeUser((id, cb) => User.find({ _id: id }).then(cb));

  passport.use(facebook);
};

