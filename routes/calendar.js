var express = require('express');
var router = express.Router();
var gCal = require('../calendar');

router.get('/', function(req, res, next) {
  res.send('this is calendar api');
});

router.get('/calendar', function (req, res) {
	webSession = req.session;
	if(webSession.authed) {
		gCal.getFreeTimes(function (error, response, body) {
      res.send(response);
    });
	} else {
		gCal.auth();
	}
});


router.post('/calendar', function (req, res) {
	webSession = req.session;
	// insert event, name of date, location, start and end time (iso string)
	if(webSession.authed) {
		// gCal.insertEvent()
	} else {
		gCal.auth();
	}
});

module.exports = router;
