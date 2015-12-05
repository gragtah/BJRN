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

router.get('/', function(req, res, next) {

  // var url = 'http://localhost:3000/_oauth/google#access_token=ya29.5HxuYol1Io8JLeGePDznbfkkwu_PC4uodKwG8_1clFYAn9AgdOV1WGpOTNQP3s76HAsn7Y4zWw&token_type=Bearer&expires_in=3600',
    // access_token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];

  if (!auth) {
  	// auth = true;  // set this somewhere else in the flow to handle better!
  	console.log("redirecting to login");
  	res.redirect('/tinder/login');
  	    // res.redirect('https://www.facebook.com/dialog/oauth?client_id=' + app_id + '&response_type=code&redirect_uri=' + redirect_uri);

  } else if (access_token == ''){
  
  	console.log("auth is true, but need to fetch access_token");
  	var code = req.query.code;
  	// console.log(code);

  var oauthAccessTokenUrl  = 'https://graph.facebook.com/v2.3/oauth/access_token?client_id=' + app_id + '&redirect_uri=' + redirect_uri + '&client_secret='+ app_secret + '&code='+ code;
  console.log("oauthAccessTokenUrl: " + oauthAccessTokenUrl);

  request({
    url: oauthAccessTokenUrl,
    method: 'GET'
  }, function(err1, response1, body1){
  	if (err1) console.log(err1);

  	access_token = (JSON.parse(body1)).access_token;

  	fBDebugTokenUrl = 'https://graph.facebook.com/debug_token?input_token=' + access_token + '&access_token=' + app_id + '|' + 'ae51ed7c0cca95e212556e06e072d25c'
  	console.log(fBDebugTokenUrl);

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
	  });
	});
  } 


  if(auth && access_token != '') {
 
 	console.log("now going to tinder client code");

 	// https://www.facebook.com/connect/login_success.html#access_token=CAAGm0PX4ZCpsBAC2GVMlM7hwI0Rt8JEGsBpk9BX6ZAAEYRKJGtFKnuKM1PEqGgsmvyHsLICtlUHlWJItTDdOd6grZCyMUVcrauJZCd4gNrr3nl2QjZB0ZCOH2yjGYccZClSGFVAfkr7kCfViR1hIc9AeAQZCZBxi5ZAhhYUFMKkFJeFruxTBD7N68JNGIT0nCI5D3pIZBuqyVGFeEf0fWNh4QHkBK805HYRt0kZD&expires_in=4801
 	    // With Facebook access token and user id, authorize our client 
        // to start using Tinder API

        // client.authorize(access_token, user_id, function(){
        client.authorize("CAAGm0PX4ZCpsBAC2GVMlM7hwI0Rt8JEGsBpk9BX6ZAAEYRKJGtFKnuKM1PEqGgsmvyHsLICtlUHlWJItTDdOd6grZCyMUVcrauJZCd4gNrr3nl2QjZB0ZCOH2yjGYccZClSGFVAfkr7kCfViR1hIc9AeAQZCZBxi5ZAhhYUFMKkFJeFruxTBD7N68JNGIT0nCI5D3pIZBuqyVGFeEf0fWNh4QHkBK805HYRt0kZD", 
        				"515006233", function(){

        	console.log("authorized! \n");
        	  client.getRecommendations(10, function(error, data){
        	  	console.log(data.results);
			    // _.chain(data.results)
			      // .pluck('_id')
			      // .each(function(id) {
			        // client.like(id, function(error, data) {
			        //   if (data.matched) {
			        //     client.sendMessage(
			        //       id,
			        //       "Hey, how's it going?"      // leaving room for actual convo now
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

              res.send('this is done ');



          }); //, _this.mainLoopInterval);  

	}

});



router.get('/login', function(req, res){
    // res.redirect('https://www.facebook.com/dialog/oauth?client_id=' + '323050247819200' + '&response_type=code&redirect_uri='+ redirect_uri);

    redirect_uri = 'http://localhost:3000/tinder?ts='+ Date.now();
    auth = true;
    res.redirect('https://www.facebook.com/dialog/oauth?client_id=' + app_id + '&response_type=code&redirect_uri=' + redirect_uri);
});


module.exports = router;
