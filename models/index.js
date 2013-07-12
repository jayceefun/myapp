//models
var config = require('../config');
var db = config.config.db;

var mongoose = require('mongoose');

var User = require('./user_model').User;
//var Music = require('./music').Music;

mongoose.connect(db, function (err) {
	if (err) {
		console.log("Error to connect mongodb: " + err.message);
		process.exit(1);
	}
});

exports.User = User;