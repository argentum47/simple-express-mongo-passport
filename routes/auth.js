'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['name', 'email', 'user_photos', 'user_likes']
}));

router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (req, user) => {
    if(err) return next(err);
    if(!user) return res.redirect('/');

    req.logIn(user, err => {
      if(err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
