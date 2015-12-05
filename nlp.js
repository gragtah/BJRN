var wit = require('node-wit');

var ACCESS_TOKEN = "UCQ3JMJJBUTX7RNI7SZ7N34JRG63XD3E";

var nlp = {};


nlp.infer = function(incoming_chat_message, callback) { //set_parameters, callback) {

	wit.captureTextIntent(ACCESS_TOKEN, incoming_chat_message, function (err, res) {
	  console.log("Fetching intelligence from Wit for chat message: " + incoming_chat_message);
	  if (err) console.log("Error: ", err);
	  console.log(JSON.stringify(res, null, " "));
	  // return res;

	  // request(apiURL, function(error, response, body){
	  return callback(err, res);
	  // });
	});

}


module.exports = nlp;