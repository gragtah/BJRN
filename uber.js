var uber = require('node-uber');
//var aws = require('aws-sdk');
var uberClient = new uber({
  client_id: 'Gr-QobTHsCgp41tES3-cyPnfo-KvI1Yf',
  client_secret: 'N9N1gjS1oohlg700KYPsiStSHSfRUX0GWYLbBRRP',
  server_token: 'TRKbz3z1bPk1NQ77-sY_4W_xXljyGE3ypnJ727K_',
  redirect_uri: 'http://localhost:3000/uber',
  name: 'cloud9'
});
//console.log(" before authorization")
// uberClient.authorization({ authorization_code: 'SOME AUTH CODE' }, 
//   function (err, accessToken, refreshToken) {
//     uberClient.user.profile(accessToken, function (err, res) {
//       console.log("here")
//       console.log(err);
//       console.log(res);
//     });
//   });


module.exports= uber;
