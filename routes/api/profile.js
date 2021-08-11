const express = require('express');
const router = require('router');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/User');
const Profile = require('../../models/Profile');



// @route  GET api/profile
// @desc   get current user profile
// @access Private

router.get('/', passport.authenticate('jwt',{session:false}), (req, res) => {
	errors = {};
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			if(!profile) {
				errors.noprofile = "There is no profile for this user";
				return res.status(404).json(errors);
			}
		})
});