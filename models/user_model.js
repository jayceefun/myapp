var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	_id: Number,
	email: String,
	nickname: String,
	realname: String,
	password: String,

	avatar: String,
	online: Boolean,

	created: { type: Date, default: Date.now },
});

UserSchema.pre('save', function (next) {
	if (!this.created) this.created = new Date();
	next();
});

exports.User = mongoose.model('User', UserSchema);