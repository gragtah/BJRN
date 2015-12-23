// Google OAuth Configuration
var googleConfig = {
  clientID: '868837249571-s0tkgajk3e55clddt3r4gv2rrnedqamm.apps.googleusercontent.com',
  clientSecret: 'momI8AqT7Lf-wjkZ82BHxfoj',
  calendarId: 'jsaurav7@gmail.com',
  redirectURL: 'http://localhost:3000/auth'
};

// Dependency setup
var express = require('express'),
  moment = require('moment'),
  google = require('googleapis');

// Initialization
var app = express(),
  calendar = google.calendar('v3');
  oAuthClient = new google.auth.OAuth2(googleConfig.clientID, googleConfig.clientSecret, googleConfig.redirectURL),
  authed = false;

// Response for localhost:3000/
var gCal = {};
gCal.getFreeTimes = function(callback) {

 // If we're not authenticated, fire off the OAuth flow
  if (!authed) {

    // Generate an OAuth URL and redirect there
    var url = oAuthClient.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/calendar.readonly'
    });
    res.redirect(url);
  } else {
    var today = moment();
    today = today.toISOString();
    var nextWeek = moment().add(7, 'd');
    nextWeek = nextWeek.toISOString();
    calendar.events.list({
      calendarId: googleConfig.calendarId,
      maxResuts: 20,
      timeMin: today,
      timeMax: nextWeek,
      auth: oAuthClient
    }, function (err, events) {
      if(err) {
        console.log("error fetching events");
        console.log(err);
      } else {
        console.log("Successfully fetched events");
        console.log(events);

        for(var i = 0; i < events.items.length; i++) {
          console.log([events.items[i].start.dateTime, events.items[i].end.dateTime]);
        };

        for(var i = today.slice(8, 10); i <= nextWeek.slice(8, 10); i++) {
          console.log("Day " + i);
          var x = findSlotsAvailable(events, i);
          if(x == false) {
            console.log("Full day available");
          }
        }
      }
    });
  }
}

function findSlotsAvailable(events, currentDay) {
  var flag = false;
  for(var i = 0; i < events.items.length; i++) {
    if(events.items[i].start.dateTime.slice(8, 10) == currentDay) {
      flag = true;
      for(var j = 6; j < 24; j++) {
        if((j + 3 <= events.items[i].start.dateTime.slice(11, 13)) || (j >= events.items[i].end.dateTime.slice(11, 13))) {
          console.log(j + "-" + (j + 3) + " available");
        } else {
          console.log(j + "-" + (j + 3) + " not available");
        }
      }
    }
  };
  return flag;
}

// Return point for oAuth flow, should match googleConfig.redirectURL
gCal.auth = function(callback){

    var code = req.param('code');

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
    } 
};

