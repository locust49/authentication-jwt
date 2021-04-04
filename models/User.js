const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please, enter an email'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please, enter a valid email']
	},
	password: {
		type: String,
		required: [true, 'Please, enter a password'],
		minlength: [6, 'Minimum password length is 6 characters']
	}
});

// fire function after doc saved to database. post != method but post == after
userSchema.post('save', function (document, next) {
	console.log('new user created and saved', document);
	next();
})

// fire function before doc saved to db.
userSchema.pre('save', function (next) {
	console.log('user about to be created', this)
	next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;