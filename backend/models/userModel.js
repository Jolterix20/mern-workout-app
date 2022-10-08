const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
})

// static signup method
userSchema.statics.signup = async function (email, password) {
	// validation
	if (!email || !password) {
		throw new Error('All fields must be filled')
	}
	if (!validator.isEmail(email)) {
		throw new Error('Email is not valid')
	}
	if (!validator.isStrongPassword(password)) {
		throw new Error('Try a stronger password')
	}

	const exists = await this.findOne({ email })
	if (exists) {
		throw new Error('Account with that email already exists')
	}

	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)

	const user = await this.create({ email, password: hash })

	return user
}

// static login method
userSchema.statics.login = async function (email, password) {
	// validation
	if (!email || !password) {
		throw new Error('Please fill all the fields')
	}

	const user = await this.findOne({ email })

	if (!user) {
		throw new Error('User does not exist!')
	}

	const matchedPassword = await bcrypt.compare(password, user.password)

	if (!matchedPassword) {
		throw new Error('Incorrect Password')
	}

	return user
}

module.exports = mongoose.model('User', userSchema)
