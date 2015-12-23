var express = require('express');
var router = express.Router();

var url = require('url');
var request = require('request');
var tinder = require('tinderjs')
var client = new tinder.TinderClient();

var app_id = "323050247819200"
var app_secret = "ae51ed7c0cca95e212556e06e072d25c"

var auth = false; //change how handled

// for login
var redirect_uri = 'http://localhost:3000/tinder?ts='+ Date.now();
var access_token = '';
var user_id = '';
var expires_in = '';

// ADD ALL THIS TO SESSION? access_token etc!


router.get('/', function(req, res, next) {

  // var url = 'http://localhost:3000/_oauth/google#access_token=ya29.5HxuYol1Io8JLeGePDznbfkkwu_PC4uodKwG8_1clFYAn9AgdOV1WGpOTNQP3s76HAsn7Y4zWw&token_type=Bearer&expires_in=3600',
    // access_token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];

  if (!auth) {
  	// auth = true;  // set this somewhere else in the flow to handle better!
  	console.log("\n\n==========================redirecting to login\n\n");
  	res.redirect('/tinder/login');
  	    // res.redirect('https://www.facebook.com/dialog/oauth?client_id=' + app_id + '&response_type=code&redirect_uri=' + redirect_uri);

  } else if (access_token == ''){
  
  	console.log("\n\n======================auth is true, but need to fetch access_token\n\n");
  	var code = req.query.code;

  var oauthAccessTokenUrl  = 'https://graph.facebook.com/v2.3/oauth/access_token?client_id=' + app_id + '&redirect_uri=' + redirect_uri + '&client_secret='+ app_secret + '&code='+ code;
  console.log("\n\noauthAccessTokenUrl: " + oauthAccessTokenUrl);

  request({
    url: oauthAccessTokenUrl,
    method: 'GET'
  }, function(err1, response1, body1){
  	if (err1) console.log(err1);

  	access_token = (JSON.parse(body1)).access_token;

  /*	var fBDebugTokenUrl = 'https://graph.facebook.com/debug_token?input_token=' + access_token + '&access_token=' + app_id + '|' + 'ae51ed7c0cca95e212556e06e072d25c'
  	console.log(fBDebugTokenUrl + "\n");

   request({
      // url: 'https://graph.facebook.com/debug_token?input_token=' + access_token + '&access_token=' + FBClientId + '|' + _this.FBClientSecret,
      url: fBDebugTokenUrl,
      method: 'GET'
    }, function(err, response, body){
      
      if (err) {
        throw new "Failed to get user id: " + err;
      } else {
        
        body = JSON.parse(body);
        
        if (!body.data.user_id) {
        	console.log(body);
          throw new "Failed to get user id.";
        }
    		console.log(body.data.user_id + " is the user id\n");
    		user_id = body.data.user_id;

	      res.redirect('/tinder/');
	    }
	  });*/

	});
  } 


  if(auth == true && access_token != '' && user_id != '') {
 
 	console.log("now going to tinder client code");
 	// https://www.facebook.com/connect/login_success.html#access_token=CAAGm0PX4ZCpsBAC2GVMlM7hwI0Rt8JEGsBpk9BX6ZAAEYRKJGtFKnuKM1PEqGgsmvyHsLICtlUHlWJItTDdOd6grZCyMUVcrauJZCd4gNrr3nl2QjZB0ZCOH2yjGYccZClSGFVAfkr7kCfViR1hIc9AeAQZCZBxi5ZAhhYUFMKkFJeFruxTBD7N68JNGIT0nCI5D3pIZBuqyVGFeEf0fWNh4QHkBK805HYRt0kZD&expires_in=4801
 	    // With Facebook access token and user id, authorize our client 
        // to start using Tinder API

        client.authorize(access_token, user_id, function(){
        // client.authorize("CAAGm0PX4ZCpsBAC2GVMlM7hwI0Rt8JEGsBpk9BX6ZAAEYRKJGtFKnuKM1PEqGgsmvyHsLICtlUHlWJItTDdOd6grZCyMUVcrauJZCd4gNrr3nl2QjZB0ZCOH2yjGYccZClSGFVAfkr7kCfViR1hIc9AeAQZCZBxi5ZAhhYUFMKkFJeFruxTBD7N68JNGIT0nCI5D3pIZBuqyVGFeEf0fWNh4QHkBK805HYRt0kZD", 
        				// "515006233", function(){

        	console.log("\n\n============authorized! \n");
        	  client.getRecommendations(10, function(error, data){
        	  	console.log(data.results);
			    // _.chain(data.results)
			      // .pluck('_id')
			      // .each(function(id) {
			        // client.like(id, function(error, data) {
			        //   if (data.matched) {
			        //     client.sendMessage(
			        //       id,
			        //       "Hey, how's it going?"      // open up to manual convo now
			        //     );
			        //   }
			        // });
      			// });

			  });
          
          // var timer = setInterval(function(){
         /*   if (new Date().getTime() >= fbTokenExpiresIn.getTime()) {
              
              clearInterval(timer);
              
              // Have the client refresh their screen to obtain
              // a new Facebook client token 
              res.json({
                redirect: '/login'
              });
              
            } else {*/
              
              // if (_this.mainLoop) {
                // _this.mainLoop();
              // }
              
            // }

              // res.send('this is done ');
              res.render('dashboard.html', { title: 'BJRN' });

          }); //, _this.mainLoopInterval);  

	}
});


// from tindr.online
// https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=basic_info,email,public_profile,user_about_me,user_activities,user_birthday,user_education_history,user_friends,user_interests,user_likes,user_location,user_photos,user_relationship_details&response_type=token
// which takes me to
// https://www.facebook.com/connect/login_success.html#access_token=CAAGm0PX4ZCpsBAI0LB5Fay6sH1PmFRnZBCfu3FNIfYfib07sDyJee66JXBf1SkkVB8vKL1xZAhD5Yz7569cd9q6S7EZC6NHmj9vrzyQ25YZAr6Sz9AoGnr1VZBRxxt2drZClpoepkeXW4JJQn43v7aZACcTIkCZA1OJuuGcM0AjB1mJQEBUZBpnYMuEwB34XVzTZBYdLA70Jmc3LuFCJsrlt6N0WKVeJR0ZASPEZD&expires_in=5834

router.get('/login', function(req, res){
    // res.redirect('https://www.facebook.com/dialog/oauth?client_id=' + '323050247819200' + '&response_type=code&redirect_uri='+ redirect_uri);

    if (req.query.access_token != undefined && req.query.expires_in != undefined) {
      access_token = req.query.access_token;
      expires_in = req.query.expires_in;
      console.log("\n\n=======got access_token and expires_in for user\n\n" + access_token + " " + expires_in)
   


      var fBDebugTokenUrl = 'https://graph.facebook.com/debug_token?input_token=' + access_token + '&access_token=' + app_id + '|' + 'ae51ed7c0cca95e212556e06e072d25c'
      console.log(fBDebugTokenUrl + "\n");

   request({
      // url: 'https://graph.facebook.com/debug_token?input_token=' + access_token + '&access_token=' + FBClientId + '|' + _this.FBClientSecret,
      url: fBDebugTokenUrl,
      method: 'GET'
    }, function(err, response, body){
      
      if (err) {
        throw new "Failed to get user id: " + err;
      } else {
          
          console.log("\n\n========= body received from debug_token: \n " + body);
        body = JSON.parse(body);
        
        if (!body.data.user_id) {
          console.log(body);
          throw new "Failed to get user id.";
        }
        console.log(body.data.user_id + " is the user id\n");
        user_id = body.data.user_id;

        //testing
        // user_id ='515006233';


        // res.redirect('/tinder/');

          auth = true;

          res.redirect('/tinder/');

      }
    });


  }


    // redirect_uri = 'http://localhost:3000/tinder?ts='+ Date.now();
  
  /*  auth = true;

   res.redirect('/tinder/');*/

    // console.log("\n\n============================ sending to facebook login\n\n")
        

    // res.redirect('https://www.facebook.com/dialog/oauth?client_id=' + app_id + '&response_type=code&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=public_profile,email,public_profile,user_about_me,user_birthday,user_education_history,user_friends,user_likes,user_location,user_photos,user_relationship_details&response_type=token');


    // https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=basic_info,email,public_profile,user_about_me,user_activities,user_birthday,user_education_history,user_friends,user_interests,user_likes,user_location,user_photos,user_relationship_details&response_type=token


/*    facebookLoginFoo(function(err, me){
      if (err) {
        console.log("\n\n============ in facebookLoginFoo");
        console.log(err);

      } else {
        client.authorize(
          me.access_token,
          me.id,
          function(){
            client.getRecommendations(10, function(error, data){
              console.log(data.results);
            });
          }
        );
      }
    });*/



});


module.exports = router;
