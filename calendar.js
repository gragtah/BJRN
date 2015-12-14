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
    var resource = {
      timeMin: today;
      timeMax: nextWeek;
      items:[
      {
        id: calendarId;
      }
      ]
    };
    var response = Calendar.Freebusy.query(resource);
    return response.calendars[calendarId];
    // calendar.events.list({
    //   calendarId: googleConfig.calendarId,
    //   timeMin: today,
    //   timeMax: nextWeek,
    //   auth: oAuthClient
    // }, function(err, events) {
    //   if(err) {
    //     console.log('Error fetching events');
    //     console.log(err);
    //   } else {
    //     console.log('Fetched events');
    //     console.log(events);

    //   }
    // });
      // Format today's date
      // var today = moment().format('YYYY-MM-DD') + 'T';

      // // Call google to fetch events for today on our calendar
      // calendar.events.list({
      //   calendarId: googleConfig.calendarId,
      //   maxResults: 20,
      //   timeMin: today + '00:00:00.000Z',
      //   timeMax: today + '23:59:59.000Z',
      //   auth: oAuthClient
      // }, function(err, events) {
      //   if(err) {
      //     console.log('Error fetching events');
      //     console.log(err);
      //   } else {

      //     // Send our JSON response back to the browser
      //     console.log('Successfully fetched events');
      //     console.log(events);
      //     res.send(events);
      //   }
      // });

  }
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
});
