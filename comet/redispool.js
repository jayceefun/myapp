var redis = require('redis');
var Pool = require('generic-pool').Pool;

var options = {
	name: 'redis',
	host: 'localhost',
	port: 6379,
	max: 100,
	idleTimeoutMillis: 30000,
	log: false,
};

function RedisPool = function (trueorfalse) {
	return Pool({
		name: options.name,
		create: function(callback) {
			var client = redis.Client(options.port, options.host, { return_buffers: trueorfalse });
			callback(null, client);
		},
		destroy: function(client){
			client.quit();
		},
		idleTimeoutMillis: options.idleTimeoutMillis,
		max: options.max,
		log: options.log,
	});
};

module.exports = RedisPool