var express = require('express');
var router = express.Router();
var calendar = require('../calendar');

router.get('/', function(req, res, next) {
  res.send('this is calendar api');
});

router.get('/calendar', function (req, res) {
	webSession = req.session;
	if(webSession.authed) {

	} else {
		calendar.auth();
	}

 /*   var code = req.param('code');

    if(code) {
      // Get an access token based on our OAuth code
      oAuthClient.getToken(code, function(err, tokens) {

        if (err) {
          console.log('Error authenticating')
          console.log(err);
        } else {
          console.log('Successfully authenticated');
          console.log(tokens);
          
          // Store our credentials and redirect back to our main page
          oAuthClient.setCredentials(tokens);
          authed = true;
          console.log("redirecting to /calendar");
          res.redirect('/calendar');
        }
      });
    } */
    // calendar.auth()
});

router.post('/event', function (req, res) {
	var event = {
		'summary': 'get it from user',
		'location': 'get it from yelp',
		'description': 'maybe a date/something',
		'start': {
		'dateTime': '2015-05-28T09:00:00-07:00', //get from list of available times, selected from user
		'timeZone': 'America/Los_Angeles',
	},
	'end': {
		'dateTime': '2015-05-28T17:00:00-07:00', //same as above (slot time is say 3 hours??)
		'timeZone': 'America/Los_Angeles',
	},
	'attendees': [
	{'email': 'lpage@example.com'},   //send to both the people(again get it from the user)
	{'email': 'sbrin@example.com'},
	],
	'reminders': {                      //might be unnecessary?
	'useDefault': false,
	'overrides': [
	{'method': 'email', 'minutes': 24 * 60},
	{'method': 'popup', 'minutes': 10}
	]},
	};
	console.log("AUTH CLIENT!!!!");
	console.log(oAuthClient);
	// var googleCalendar = new gcal.googleCalendar();
	calendar.events.insert({
	auth: oAuthClient,
	calendarId: 'primary',
	resource: event,
	}, function(err, event) {
	if (err) {
	console.log('There was an error contacting the Calendar service: ');
	console.log(err);
	return; 
	}
	console.log('Event created: %s', event.htmlLink);
	});
});
