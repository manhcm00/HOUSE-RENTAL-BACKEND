// VALIDATION
const Joi = require('joi');
const { model } = require('../models/UserModel');

// Register Validation
const userRegisterValidation = (req, res, next) => {
	const schema = Joi.object({
		username: Joi.string().alphanum().min(3).max(30).required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
	});

	const { error } = schema.validate(req.body)

	if (error) {
		return res.status(422).json({
			message: 'Validation error.',
			error
		});
	} else {
		next();
	}
};

const ownerRegisterValidation = (req, res, next) => {
	const schema = Joi.object({
		firstName: Joi.string().alphanum().min(2).max(30).required(),
		lastName: Joi.string().alphanum().min(2).max(30).required(),
		citizenId: Joi.string().alphanum().min(9).max(12).required(),
		city: Joi.string().alphanum().required(),
		address: Joi.string().required(),
		phoneNumber: Joi.number().min(10).required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
	})

	const { error } = schema.validate(req.body)
	if (error) {
		return res.status(422).json({
			message: 'Validation error.',
			error
		});
	} else {
		console.log('pass')
		next();
	}
}

// Login Validation
const loginValidation = (req, res, next) => {
	const schema = Joi.object({
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
	});

	const { error } = schema.validate(req.body)
	if (error) {
		return res.status(422).json({
			message: 'Validation error.',
			error
		});
	} else {
		console.log('validation success')
		next()
	}
};

module.exports = {
	userRegisterValidation,
	loginValidation,
	ownerRegisterValidation
}
