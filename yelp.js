
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

var categories = {'american': 'tradamerican', 'australian': 'australian', 'barbeque': 'bbq', 'belgian': 'belgian', 'breakfast': 'breakfast_brunch', 'brunch': 'breakfast_brunch', 'british': 'british', 'buffet': 'buffets', 'burger': 'burgers', 'burgers': 'burgers', 'coffee': 'cafes', 'chinese': 'chinese', 'fast food': 'hotdogs', 'fish and chips': 'fishnchips', 'french': 'french', 'indian': 'indpak', 'pakistani': 'pakistani', 'persian': 'persian', 'pizza': 'pizza', 'salad': 'salad', 'sandwich': 'sandwiches', 'spanish': 'spanish', 'thai': 'thai', 'vegan': 'vegan', 'vegetarian': 'vegetarian', 'no meat': 'vegetarian'};

var yelp = {};
// function yelp(set_parameters, callback) {
yelp.yelpSearch = function(parameter_string, callback) {
  /* The type of request */
  var httpMethod = 'GET';

  /* The url we are using for the request */
  var url = 'http://api.yelp.com/v2/search';

  /* We can setup default parameters here */
  var default_parameters = {
    // location: '10027',
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

  var parameter_string = (parameter_string === undefined) ? "" : parameter_string;
    // console.log(parameter_string);
    
  var terms = parameter_string.search_terms.split(" ");
  // console.log(parameter_string.search_terms.indexOf("not"));

  if (parameter_string.search_terms.indexOf("not") == -1) {
    var term_str = "";
    terms.forEach(function (term) {
      term_str += categories[term] + ",";
      // console.log(categories[term]);
    })
    // console.log(term_str.slice(0, -1));
    var filter = JSON.stringify(term_str.slice(0, -1));
    // console.log(filter);
    var stripped_filter = filter.replace(/\"/g, "");
    // console.log(filter);
    if(stripped_filter == "undefined") {
      stripped_filter = 'restaurants';
    }
    var set_parameters = {
      location: parameter_string.location,
      category_filter: stripped_filter
    }
  } else {
    var newdict = categories;
    console.log("\n\n====" + terms);
    terms.forEach(function (term) {
      if(term != 'not') {
        console.log(newdict[term]);
        delete newdict[term];
      }
    });
    var term_str;
    newdict.forEach(function (term) {
      term_str += newdict[term] + ",";
    });
    console.log (newdict + " and term_str: " + term_str);
    var filter = JSON.stringify(term_str.slice(0, -1));
    var stripped_filter = filter.replace(/\"/g, "");
    if(stripped_filter == "undefined") {
      stripped_filter = 'restaurants';
    }
    console.log(stripped_filter);
    var set_parameters = {
      location: parameter_string.location,
      category_filter: stripped_filter
    }
  }

  // var set_parameters = {}
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
  console.log(paramURL);

  /* Add the query string to the url */
  var apiURL = url+'?'+paramURL;
  console.log(apiURL);

  /* Then we use request to send make the API Request */
  request(apiURL, function(error, response, body){
    return callback(error, response, body);
  });

}

/*,
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