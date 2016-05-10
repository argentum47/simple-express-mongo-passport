'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'user_photos', 'user_likes', 'user_birthday']
}));

router.get('/facebook/callback', (req, res, next) => {
  console.log("got callback");

  passport.authenticate('facebook', (err, user) => {
    if(err) return next(err);
    if(!user) return res.redirect('/');

    console.log("here");

    req.logIn(user, err => {
      console.log(user, err, "-----");
      if(err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
