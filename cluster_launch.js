// OR JUST LAUNCH THIS ENTIRE THING IN A LOOP, no cluster!!!  <--------

/*
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

var launcher = function() {
    cluster.setupMaster({
      // exec: 'worker.js'
      exec: 'tinderbot.js'
    });
    if (cluster.isMaster) {
      // Fork workers.
      //console.log('master');
      for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', function(worker, code, signal) {
        console.log('worker/tinderbot ' + worker.process.pid + ' died');
      });
    } else {
        //console.log('not master');
    }
};
module.exports = launcher;
*/