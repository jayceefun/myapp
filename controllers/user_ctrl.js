var models = require('../models/index');
var User = models.User;
var async = require('async');
var RedisPool = require('./common/redispool');
var pool = RedisPool();
var redis = require('redis');

exports.savename = function(req, res) {
	var obj = req.query;
	if (obj) {
		var nickname = obj.nickname;
		async.waterfall([
			function (callback) {
				var user = new User();
				user.nickname = nickname;
				user.save(function (err) {
					if (err) {
						callback(new Error("save user name failed."));
					} else {
						callback(null);
					}
				});
			},
			function (callback) {
				var condition = {
					nickname: nickname,
				};
				User.find(condition, function (err, user) {
					if (!user) {
						callback(new Error("node user finded"));
					} else if (err) {
						callback(new Error(err.toString()));
					} else {
						callback(null, user);
					}
				});
			},
		], function (err, user) {
			if (err) {
				console.log(err.toString());
				res.send(500, JSON.stringify({status: 1, msg: "获取用户信息失败"}));
				res.end();
			} else {
				res.send(200, JSON.stringify({status: 0, result: user}));
				res.end();
			}
		});
	} else {
		res.send(500, JSON.stringify({status: 1, msg: "获取参数失败"}));
		res.end();
	}
};

exports.innerRedirect = function (req, res) {
	res.redirect(301, '../google');
};

exports.google = function (req, res) {
	res.redirect(301, 'https://www.google.com.tw');
};


exports.getMessage = function (req, res) {
	var obj = req.query;
	if (obj) {
		var uid = obj.uid;
		var client = createRedisClient(uid);
	}
};

function createRedisClient(uid) {
	var client = redis.createClient();
	client.on('message', function (channel, message) {
		if (channel && message) {
			return client;
		}
	});
}