const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
 
// @route GET api/posts
// @desc Get posts
// @access Public

router.get('/', (req, res) => {
	alert(req+res);
	Post.find()
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({nopostsfound: "No posts found"}));
});


// @route POST api/posts
// @desc Create post
// @access Private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		user: req.user.id
	});

	newPost.save().then(post => res.json(post));
});


// @route POST api/posts/:id
// @desc delete post
// @access Private

router.delete('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if(post.user.toString() !== req.user.id) {
						return res.status(401).json({ notauthorised: "User not authorised"});
					}

					post.remove().then(() => res.json({success:true}));
				})
				.catch(err => res.status(404).json({postnotfound: "Post not found"}));
		});
});

// @route POST api/posts/like/:id
// @desc like post
// @access Private

router.post('/like/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if(post.likes.filter(like => like.user.toString()===req.user.id).length>0){
						return res.status(400).json({alreadyliked:"User already liked this post"})
					}

					posts.likes.unshift({user: req.user.id});


					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({postnotfound: "Post not found"}));
		});
});

// @route POST api/posts/unlike/:id
// @desc unlike post
// @access Private

router.post('/unlike/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if(post.likes.filter(like => like.user.toString()===req.user.id).length===0){
						return res.status(400).json({notliked:"User not yet liked this post"});
					}

					const removeIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);

					post.likes.splice(removeIndex, 1);


					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({postnotfound: "Post not found"}));
		});
});



module.exports = router;