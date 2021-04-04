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

###### N.B if the validator doesn't have a specific message property, we could define the error message just like in the line 9 of [this file](https://github.com/locust49/nodejs-tuto/blob/jwt/controllers/authController.js)

# Mongoose Hooks

Hooks are used to fire code at different points when documents are saved to database.