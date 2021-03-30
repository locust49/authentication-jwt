module.exports.signup_get = (request, response) => {
	response.render('signup');
}

module.exports.login_get = (request, response) => {
	response.render('login');
}

module.exports.signup_post = (request, response) => {
	response.send('new signup');
}

module.exports.login_post = (request, response) => {
	response.send('user login');
}