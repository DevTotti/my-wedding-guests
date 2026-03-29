import Joi from "joi";

export const createGuestSchema = Joi.object({
  salutation: Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string(),
  gender: Joi.string().valid("male", "female"),
});

export const updateGuestSchema = Joi.object({
  salutation: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string(),
  gender: Joi.string().valid("male", "female"),
});

export const bouncerPinSchema = Joi.object({
  pin: Joi.string().required(),
});

export const adminPasswordSchema = Joi.object({
  password: Joi.string().required(),
});
