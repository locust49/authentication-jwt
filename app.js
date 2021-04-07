const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://souad:test1234@Cluster0.i5ehu.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

//cookies
app.get('/set-cookies', (request, response) => {
	// create cookie and set it to false
	response.cookie('newUser', 'false');
	response.cookie('isEmployee', 'true', { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true});

	response.send('you got the cookies.');
});

app.get('/read-cookies', (request, response) => {
	const cookies = request.cookies;

	console.log(cookies.newUser);
	response.json(cookies);
});

app.use(authRoutes);