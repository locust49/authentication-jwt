const User = require('../models/User');

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
		response.status(201).json(user);
	}
	catch (error){
		console.error(error);
		response.status(400).send('error, user not created')
	}
}

module.exports.login_post = async (request, response) => {
	const { email, password } = request.body;

	console.log(email, password);
	response.send('user login');
}