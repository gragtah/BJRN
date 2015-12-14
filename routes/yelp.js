var express = require('express');
var router = express.Router();
var yelp = require('../yelp');

var restaurants = [];

router.get('/', function(req, res, next) {
  res.send('this is yelp api');
});

router.get('/suggest', function(request, response) {
  webSession = request.session;

  // console.log(request.query.venueType);
  // response.send(yelp.suggestDateVenue({category_filter:'restaurants'}, webSession));
  if(webSession.restaurants) {    
    if (webSession.i + 1 >= webSession.restaurants.length) {
      webSession.i = 0;
    } else {
      webSession.i += 1;
    }
    webSession.currentRestaurant = webSession.restaurants[webSession.i];

    // console.log(webSession.i + " and " + webSession.currentRestaurant.name + " " + webSession.currentRestaurant.address)
    response.send(webSession.currentRestaurant);
    
  } else {
    webSession.i = 0;
    // 'restaurants,bars'
    yelp.yelpSearch({category_filter: 'restaurants'}, function(error, res, body){
      var parsedbody = JSON.parse(body);
      // console.log(parsedbody);
      // console.log(parsedbody.businesses.length);
      parsedbody.businesses.forEach(function(place) {
        restaurants.push({
            'name': place.name,
            'address': place.location.address.join()
          }
        );
      });
      webSession.restaurants = restaurants;
      webSession.currentRestaurant = webSession.restaurants[webSession.i];
      response.send(webSession.currentRestaurant);
    });
  }
});

module.exports = router;