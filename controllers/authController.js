const User = require('../models/User');

// handle errors
const handleErrors = (error) => {
	// console.log(error.message, error.code)
	let errors = { email: '', password: ''};

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
		const errors = handleErrors(error);
		response.status(400).json(errors);
	}
}

module.exports.login_post = async (request, response) => {
	const { email, password } = request.body;

	console.log(email, password);
	response.send('user login');
}