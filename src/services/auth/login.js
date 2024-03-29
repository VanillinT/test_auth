let LocalStrategy = require('passport-local').Strategy,
	User = require('../db/models/user'),
	bcrypt = require('bcrypt-nodejs'),
	isValidPassword = function(user, password) {
		return bcrypt.compareSync(password, user.password);
	};

module.exports = new LocalStrategy({
			usernameField: 'email',
			passReqToCallback: true
		},
		function (req, email, password, done) {
			console.log('local');
			console.log(email);
			// check in mongo if a user with username exists or not
			User.findOne({'email': email},
				function (err, user) {
					// In case of any error, return using the done method
					if (err)
						return done(err);
					// Username does not exist, log the error and redirect back
					if (!user) {
						console.log('User Not Found with email ' + email);
						return done(null, false, req.flash('message', 'User not found.'));
					}
					// User exists but wrong password, log the error
					if (!isValidPassword(user, password)) {
						console.log('Invalid Password');
						return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
					}
					// User and password both match, return user from done method
					// which will be treated like success
					return done(null, user);
				}
			);
		});