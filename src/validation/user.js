"use strict";
const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string()
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required()
    .messages({
      "string.pattern.base": "Invalid Email",
    }),
  firstName: Joi.string().required().messages({
    "any.required": "firstName is required",
  }),
  lastName: Joi.string().required().messages({
    "any.required": "firstName is required",
  }),
  username: Joi.string().required().messages({
    "any.required": "username is required",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password combination should be at least 6 characters with one special character and one digit",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .messages({
      "string.pattern.base": "Invalid Email",
    }),
  username: Joi.string(),
  password: Joi.string().required(),
});

const updateSchema = Joi.object({
  email: Joi.string()
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .messages({
      "string.pattern.base": "Invalid Email",
    }),
  firstName: Joi.string(),
  lastName: Joi.string(),
  username: Joi.string(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
    .messages({
      "string.pattern.base":
        "Password combination should be at least 6 characters with one special character and one digit",
    }),
});

module.exports = { registerSchema, loginSchema, updateSchema };
