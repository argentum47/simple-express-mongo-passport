'use strict';
const mongoose = require('mongoose');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = mongoose.model('User');
const config = require('../config.js');

module.exports = new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL,
  passReqToCallback: true,
  profileFields: ['name', 'email', 'picture.type(large)']
}, (req, accessToken, refreshToken, profile, cb) => {
  var userRequest;

  if(!profile.emails) return done(null, null, null, "email is missing");
 
  let email = profile.emails[0].value;
  
  if(req.user)
    userRequest = Promise.resolve(req.user);
  else
    userRequest = User.find({ "facebook.id" : profile.id }).then(user => user || User.find({ email: email }));

  return userRequest.then(u => {
    let user = u ? u: new User();

    user.username = profile.username;
    user.name = profile.displayName;
    user.uid = profile.id;
    user.provider = 'facebook';
    user.token = accessToken;
    user.email = u ? u.email : email;

    return user.save();
  }).then(u => done(null, u), err => done(err));
});
