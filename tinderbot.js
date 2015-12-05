var tinderbot = require('tinderbot');
var bot = new tinderbot();
var _ = require('underscore') // use lodash instead

bot.port="3000";

bot.mainLoop = function() {
  bot.client.getRecommendations(10, function(error, data){
    _.chain(data.results)
      .pluck('_id')
      .each(function(id) {
        bot.client.like(id, function(error, data) {
          if (data.matched) {
            bot.client.sendMessage(
              id,
              "Hey, I'm playing this cool new game Castle Clash. Have you heard of it?"
            );
          }
        });
      });
  });
};

bot.live();
