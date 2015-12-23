var express = require('express');
var router = express.Router();
var gCal = require('../calendar');

router.get('/', function(req, res, next) {
  res.send('this is calendar api');
});

router.get('/calendar', function (req, res) {
	webSession = req.session;
	if(webSession.authed) {
		// gCal.getFreeTimes()
	} else {
		calendar.auth();
	}
});


router.post('/calendar', function (req, res) {
	webSession = req.session;
	// insert event, name of date, location, start and end time (iso string)
	if(webSession.authed) {
		// gCal.insertEvent()
	} else {
		calendar.auth();
	}
});

module.exports = router;
