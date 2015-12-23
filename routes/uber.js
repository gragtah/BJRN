var express = require('express');
var router = express.Router();
var uber = require('../uber');

router.get('/', function(req, res, next) {
  res.send('this is uber api');
});

router.get('/uber', function (req, res) {
	webSession = req.session;
	if(webSession.authed) {
		//
	} else {
		//uber.auth();
	}
});


module.exports = router;