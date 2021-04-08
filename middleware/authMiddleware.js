const jwt = require('jsonwebtoken');
const decode = require('jsonwebtoken/decode');

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

// check current user
const checkUser =  (request, response, next) => {
	const token = request.cookies.jwt;

	if (token)
	{
		jwt.verify(token, secret, async (error, decodedToken) => {
			if (error)
			{
				console.log(error.message);
				response.locals.user = null;
				next();
			}
			else
			{
				console.log(decodedToken);
				let user = await User.findById(decodedToken.id);
				response.locals.user = user;
				next();
			}
		});
	}
	else
	{
		response.locals.user = null;
		next();
	}
}
module.exports = { requireAuth , checkUser };