var accountSid = 'ACd84c3bb32888ba1d964e679264b9001c';
var authToken = '31b4912e400739d886db6ff6cfe53f6c';
var client = require('twilio')(accountSid, authToken);
var fs = require('fs');
client.messages.create({
    body: "whats up, twilio testing",
    to: "+13478193711",
    from: "+17328750945"
}, function(err, message) {
    console.log(message.sid);
});