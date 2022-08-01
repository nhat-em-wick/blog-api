const Joi = require('joi');

const registerValidate = data => {
  const userSchema = Joi.object({
    name: Joi.string().alphanum().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
  })
  return userSchema.validate(data)
}

const loginValidate = data => {
  const userSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
  })
  return userSchema.validate(data)
}

module.exports = {
  registerValidate,
  loginValidate
}