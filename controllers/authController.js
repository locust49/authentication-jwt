const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (error) => {
	console.log(error.message, error.code)
	let errors = { email: '', password: ''};

	// incorrect credentials
	if (error.message === 'incorrect email')
		errors.email = 'that email is not registred';
	if (error.message === 'incorrect password')
		errors.password = 'that password is incorrect';

	// duplicate error code
	if (error.code === 11000) {
		errors.email = 'that email is already registred';
		return errors;
	}

	// validation errors
	if (error.message.includes('user validation failed')) {
		Object.values(error.errors).forEach(({properties}) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
}

const maxAge = 3 * 24 * 60 * 60; // 3 days in sec = jwt time validation

const createToken = (id) => {

	return jwt.sign(
			{ id }, //payload
			'this is the secret sentence which normally shouldnt be published anywhere',
			{ expiresIn: maxAge });
}

module.exports.signup_get = (request, response) => {
	response.render('signup');
}

module.exports.login_get = (request, response) => {
	response.render('login');
}

module.exports.signup_post = async (request, response) => {
	const { email, password } = request.body;

	try {
		const user = await User.create({ email, password });
		const token = createToken(user._id);
		response.cookie('JWT', token, {httpOnly: true, maxAge: maxAge * 1000});
		response.status(201).json({user: user._id});
	}
	catch (error) {
		const errors = handleErrors(error);
		response.status(400).json({ errors });
	}
}

module.exports.login_post = async (request, response) => {
	const { email, password } = request.body;

	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);
		response.cookie('JWT', token, {httpOnly: true, maxAge: maxAge * 1000});
		response.status(200).json({ user: user._id });
	}
	catch (error) {
		const errors = handleErrors(error);
		response.status(400).json({ errors });
	}
}

module.exports.logout_get = (request, response) => {
	response.cookie('JWT', '', { maxAge: 1 });
	response.redirect('/');
}