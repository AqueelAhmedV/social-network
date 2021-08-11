const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');




// @route GET api/users/test
// @desc Tests users route
// @acces Public

router.get('/test', (req, res) => res.json({message : "users works"}));

// @route POST api/users/signup
// @desc Create New Account
// @acces Public


router.post('/signup', (req, res) => {

	
	User.findOne({ email: req.body.email })
		.then((user) => {
			if(user) {
				return res.status(400).json({email: 'Email already exists'});
			}
			else {
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					phone: req.body.phone,
					password: req.body.password,
				});

				bcrypt.genSalt(10, (err,salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if(err) throw err;
						newUser.password = hash;
						newUser.save()
							.then((user) => res.json(user))
							.catch((err) => console.log(err));
					});
				});
			}
		});
});

// @route POST api/users/signin
// @desc Login User / returns JWT
// @acces Public

router.post('/signin', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({email : email})
		.then((user) => {
			if(!user) {
				return res.status(404).json({email: 'User not found'});
			}

			bcrypt.compare(password, user.password)
				.then((isMatch) => {
					if(isMatch) {
						const payload = {
							id: user.id,
							name: user.name,
						}
						jwt.sign(payload,
						 keys.secretKey,
						 { expiresIn: 3600 },
						 (err, token) => {
						 	res.json({
						 		success: true,
						 		token: 'Bearer ' + token
						 	})
						});
					}
					else {
						return res.status(400).json({password: 'Password incorrect'});
					}
				})
		})
});

// @route GET api/users/current
// @desc return current user
// @access Private

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
	res.json(req.user);
});


module.exports = router;