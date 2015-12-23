var express = require('express');
var router = express.Router();
var uber = require('../uber');
var authUrl = "https://login.uber.com/oauth/authorize";
var request=require('request');
var requrl='https://sandbox-api.uber.com/v1/sandbox/requests/'
var uberClient = new uber({
  client_id: 'Gr-QobTHsCgp41tES3-cyPnfo-KvI1Yf',
  client_secret: 'N9N1gjS1oohlg700KYPsiStSHSfRUX0GWYLbBRRP',
  server_token: 'TRKbz3z1bPk1NQ77-sY_4W_xXljyGE3ypnJ727K_',
  redirect_uri: 'http://localhost:3000/uber',
  name: 'cloud9'
});

router.get('/', function(req, res, next) {
  res.send('this is uber api');
});

router.get('/uber', function(req,res,next){
  var url = "https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=" + encodeURIComponent("Gr-QobTHsCgp41tES3-cyPnfo-KvI1Yf")+"&scope=profile%20history_lite%20history%20request";
  res.redirect('/uber/request');
})

router.get('/request',function(req,res,next){
	console.log("stuck here")
	request({
		url:requrl,
		method:'POST',
		form: {
		auth:uberClient,
        start_latitude:'40.759011',
		start_longitude:'-73.984472',
		end_latitude:'40.706086',
		end_longitude:'-73.996864'
    	}
		
	},function(err,response,body){
		if (!err && response.statusCode == 200) {
        console.log(body); // Show the HTML for the Modulus homepage.
	}

})
})

// router.get('/uber', function(req,res,next){
  
//   res.redirect(url);
// })


// router.get('/uber', function (req, res) {
// 	webSession = req.session;
// 	if(webSession.authed) {
		
// 	} else {
// 		//uber.auth();
// 	}
// });


module.exports = router;


//Akd2JUaZG81UPlzbUwLJn6SxbD1NIx