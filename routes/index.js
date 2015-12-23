var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'BJRN' });
});


router.get('/dashboard', function(req, res, next) {
  res.render('dashboard.html', { title: 'BJRN' });
});

module.exports = router;