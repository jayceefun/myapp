var redis = require('redis');
var Pool = require('generic-pool').Pool

var RedisPool = function () {
	var options = {
		name: 'redis',
		host: 'localhost',
		port: 6379,
		max: 100,
		idleTimeoutMillis: 30000,
		log: false,
	};

	return Pool({
		name: options.name,
		create: function (callback) {
			var client = redis.createClient(options.port, options.host);
			callback(null, client);
		},
		destroy: function (client) {
			client.quit();
		},
		max: options.max,
		idleTimeoutMillis: options.idleTimeoutMillis,
		log: options.log,
	});
};

module.exports = RedisPool;