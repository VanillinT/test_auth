let LocalStrategy = require('passport-local').Strategy,
	User = require('../db/models/user'),
	bcrypt = require('bcrypt-nodejs'),
	//generating hash to store the password
 	createHash = function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
	};

module.exports = new LocalStrategy({
			usernameField: 'email', // change default name of a required usernameField
			passReqToCallback: true // allows us to pass back the entire request to the callback
		},
		function (req, email, password, done) {
			let findOrCreateUser = function () {
				// find a user in Mongo with provided email
				User.findOne({'email': email}, function (err, user) {
					if (err) {
						console.log('Error while signing up: ' + err);
						return done(err);
					}
					// already exists
					if (user) {
						console.log(`User with email ${email} already exists`);
						return done(null, false, req.flash('message', 'Email already in use'));
					} else {
						// if there is no user with that email
						// create the user
						let newUser = new User();

						// set the user's local credentials
						newUser.email = email;
						newUser.password = createHash(password);
						newUser.name = req.body.name;
						newUser.surname = req.body.surname;
						newUser.birthDate = req.body.birthDate;
						newUser.regDate = Date.now();

						newUser.save(function (err) {
							if (err) {
								console.log('Error while saving user: ' + err);
								throw err;
							}
							console.log('User Registration successful');
							return done(null, newUser);
						});
					}
				});
			};
			// Delay the execution of findOrCreateUser and execute the method
			// in the next tick of the event loop
			process.nextTick(findOrCreateUser);
		});