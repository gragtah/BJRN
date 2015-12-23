var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'BJRN' });
});


router.get('/dashboard', function(req, res, next) {
  res.render('dashboard.html', { title: 'BJRN' });
});

router.get('/scheduled', function(req, res, next) {
  res.render('scheduled.html', { title: 'BJRN' });
});

router.get('/datechat', function(req, res, next) {
  res.render('datechat.html', { title: 'BJRN' });
});

router.get('/settings', function(req, res, next) {
  res.render('settings.html', { title: 'BJRN' });
});

module.exports = router;