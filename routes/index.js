var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user ? req.user : {} });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
