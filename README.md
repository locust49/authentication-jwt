# Authentication with jwt - tuto
###### Using Netninja playlist [Node.js Auth Tutorial (JWT)](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp)

# JWT 
Stands for JSON Web Tokens.

# Defining Auth Routes
Route | Method | Utility
------|-------|---------
/signup | GET | sign up page
/login | GET | log in page
/signup | POST | create a new user in db
/login | POST | authenticate a current user
/logout | GET | log a user out

# Postman
A tool to simulate requests when we don't have a server :D

# Mongoose Validation

We can use our own functions to validate stuff we want, but we also can use a 3rd party tool that does the job. 
`npm install validator`

###### N.B if the validator doesn't have a specific message property, we could define the error message just like in the line 15 of [this file](https://github.com/locust49/authentication-jwt/blob/main/controllers/authController.js)

# Mongoose Hooks

Hooks are used to fire code at different points when documents are saved to database.

# Hashing Passwords (bcrypt)

Oh, so now I can see everyone's password and .. * *thinking of evil things* *

**No !**
Passwords should be hashed in order to protect our user's data if ever our database got compromised. 

To do that, we'll be using bcrype.

`npm install bcrypt`

Hashing is a one way process, but again, it doesn't mean that a hashing algorithm can't be reversed. Reason why we should use a "salt" to the string we want to hash

# Cookies 🍪🍪

`npm install cookie-parser`

# The theory of everything.. ish 

JWT is made of 3 parts:
<pre>
Headers		| Tells the server what type of signature is being used (meta data about the token)
Payload		| Is used to identify the user (user id but no sensitive data)
Signature	| Makes the token secure (== stamp of authenticity)
</pre>
## [JWT Signature](https://www.youtube.com/watch?v=LZq0G8WUaII)

<pre>
Headers _
	 | _ Hashed together _ Secret *(the only way to verify a token + stored in the server)*
Payload _|	|
		|
 	   Signature
</pre>

When the Header, Payload and the secure Secret string are hashed together, they create the token **signature** which is added to the end of the jwt after the Headers and Payload.

`Headers.Payload.Signature`

Our JWT is then added into a cookie and sent and stored in a browser.

Seems hard and complicated.. but I heard it might be easier with the help of a package ...

# New User Signup

`npm install jsonwebtoken`

Now, we can easily create a jwt with the method `jwt.sign()` where we specify the payload, secret sentence ? (i still don't get this part), and some atrtibutes such as the expiration time. After that, we send the token via a cookie :D

# Log a user in

On the server, we re going to take the credential and look for the email in the database, then we compare the hashed password with the existant one in the db. If correct : log in, else don't.

I was thinking of how would we compare the hashed passwords knowing that they are hashed obviously, and contain a random generated Salt. Wellp, [this is how](https://stackoverflow.com/a/13024344) !

To "prove" that a user is logged in, we should create a jwt that needs to be present ofc and verified by the server.

# Protecting Routes

We need to detect that the JWT cookie exists on the request, secondly we need to verify that the jwt is authentic and hasn't been messed with.
To do so, we create a [middleware](https://github.com/locust49/authentication-jwt/blob/main/middleware/authMiddleware.js).

# Logging out

Now that we have used the JWt to maintain somehow the log in of a user, maybe that logging out means that we should destroy that cookie !
Actually, we can't directly remove a cookie, but we're going to replace the value of it with an empty string with a **VERY** short expiration date ;)

# Checking user

Sometimes (Always), we need to show some links or features only to a logged in user, or maybe to a specific user. This is the utility of the JWT and *locals*. 
Don't forget to use some magic *ejs*.

#### I think I know enough for the moment about authentication :D
