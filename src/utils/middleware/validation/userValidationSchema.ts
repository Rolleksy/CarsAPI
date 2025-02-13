import Joi from 'joi';

export async function registerUserValidationSchema() {
  return Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
  });
}

export async function loginUserValidationSchema() {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
}
