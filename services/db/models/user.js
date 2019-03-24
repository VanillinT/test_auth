const mongoose = require('mongoose');

//creating a user model
module.exports = mongoose.model('User',new mongoose.Schema({
	id: String,
	password: {
		type: String,
		require: true //password is required to save a user
	},
	email: {
		type: String,
		require: true, //email is required to save a user
		unique: true //email must be unique
	},
	name: String,
	surname: String,
	birthDate: Date,
	regDate: {
		type: Date,
		Default: Date.now()
	}
}));