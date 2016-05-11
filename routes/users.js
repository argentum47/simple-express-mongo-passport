'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/location', function(req, res, next) {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  if(req.user) {
    User.findOne({ email: req.user.email }).then(user => {
      user.location = [latitude, longitude];
      return user.save();
    })
    .then(user => {
      req.user = user;
      res.status(200).send({ updated: true });
    }).catch(err => res.status(500).send());
  } else {
    res.status(401).send();
  }

});
module.exports = router;
