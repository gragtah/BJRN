var express = require('express');
var router = express.Router();
var nlp = require('../nlp');

router.get('/', function(req, res, next) {
  res.send('our nlp routes');
});


router.get('/infer', function(req, res, next) {
  // res.send('our nlp routes');

	incoming_chat_message = req.query.text || "Would you like to meet up this weekend? :)";

    nlp.infer(incoming_chat_message, function(error, wit_res){

    	// res.send(wit_res);

   	   res.setHeader('Content-Type', 'application/json');
   		res.send(JSON.stringify(wit_res, null, 3));

    });

});


module.exports = router;
