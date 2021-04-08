const jwt = require('jsonwebtoken');

const requireAuth = (request, response, next) => {

	//grab the jwt
	const token = request.cookies.JWT;
	const secret = 'this is the secret sentence which normally shouldnt be published anywhere';
	// check jwt exists and valide
	if (token)
	{
		jwt.verify(token, secret, (error, decodedToken) => {
			if (error)
			{
				console.log(error.message);
				response.redirect('/login');
			}
			else
			{
				console.log(decodedToken);
				next();
			}
		});
	}
	else
	{
		response.redirect('/login');
	}
}

module.exports = { requireAuth };