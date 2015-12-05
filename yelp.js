/* require the modules needed */
var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');

process.env['oauth_consumer_key'] = '04Gf8cHzaEPt6rYfWkJOiQ';
process.env['consumerSecret'] = 'M61YIxIIcLpB3aMeWyC-X2QLF5U';
process.env['oauth_token'] = 'kn3esQBhVlHche_UrvFIlAJCsyIcAMQ4';
process.env['tokenSecret'] = '4nDZB92PFZdbe7Iso_mkfAq3MC8';

/* Function for yelp call
 * ------------------------
 * set_parameters: object with params to search
 * callback: callback(error, response, body)
 */

var restaurants = [];

var yelp = {};
// function yelp(set_parameters, callback) {
yelp.yelpSearch = function(set_parameters, callback) {
  /* The type of request */
  var httpMethod = 'GET';

  /* The url we are using for the request */
  var url = 'http://api.yelp.com/v2/search';

  /* We can setup default parameters here */
  var default_parameters = {
    location: '10027',
    sort: '2'
  };

  /* We set the require parameters here */
  var required_parameters = {
    oauth_consumer_key : process.env.oauth_consumer_key,
    oauth_token : process.env.oauth_token,
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };

  /* We combine all the parameters in order of importance */ 
  var parameters = _.assign(default_parameters, set_parameters, required_parameters);

  /* We set our secrets here */
  var consumerSecret = process.env.consumerSecret;
  var tokenSecret = process.env.tokenSecret;

  /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  /* We add the signature to the list of paramters */
  parameters.oauth_signature = signature;

  /* Then we turn the paramters object, to a query string */
  var paramURL = qs.stringify(parameters);

  /* Add the query string to the url */
  var apiURL = url+'?'+paramURL;

  /* Then we use request to send make the API Request */
  request(apiURL, function(error, response, body){
    return callback(error, response, body);
  });

}/*,

suggestDateVenue: function(set_parameters, webSession) {

    if(webSession.restaurants) {
      webSession.currentRestaurant = webSession.restaurants[webSession.i];
      if (webSession.i + 1 >= webSession.restaurants.length) {
        webSession.i = 0;
      } else {
        webSession.i += 1;
      }
      console.log(webSession.i + " and branch 1 " + webSession.currentRestaurant)
      return webSession.currentRestaurant
      // response.send(webSession.currentRestaurant);

    } else {
      webSession.i = 0;
      this.yelpSearch(set_parameters, function(error, res, body){
        var parsedbody = JSON.parse(body);
        // console.log(parsedbody);
        // console.log(parsedbody.businesses.length);

        parsedbody.businesses.forEach(function(place) {
                  // console.log(place);

          restaurants.push(place.name);
        });
        webSession.restaurants = restaurants;
        webSession.currentRestaurant = webSession.restaurants[webSession.i];

            console.log(webSession.i + " and branch 2" + webSession.currentRestaurant)

        // response.send(webSession.currentRestaurant);
        return webSession.currentRestaurant;

      });
    }
  }*/

// };


module.exports = yelp;