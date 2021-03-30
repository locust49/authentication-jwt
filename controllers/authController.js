module.exports.signup_get = (request, response) => {
	response.render('signup');
}

module.exports.login_get = (request, response) => {
	response.render('login');
}

module.exports.signup_post = (request, response) => {
	const { email, password } = request.body;

	console.log(email, password);
	response.send('new signup');
}

module.exports.login_post = (request, response) => {
	const { email, password } = request.body;

	console.log(email, password);
	response.send('user login');
}