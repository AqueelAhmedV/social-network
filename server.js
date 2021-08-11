const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const app = express();
const db = require('./config/keys').mongoURI;

app.use(bodyParser.urlencoded({extende: false}));
app.use(bodyParser.json());

mongoose
	.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err));


//app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/users', users);
app.use('/api/posts', posts);
//passport middleware

if(process.env.NODE_ENV==='production'){
	app.use(express.static('client/build'));

	app.get('*', (req,res)=>{
		res.sendFile(path.resolve(__dirname,'build', 'index.html'));
	});
}

app.use(passport.initialize());

require('./config/passport.js')(passport);






const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));


