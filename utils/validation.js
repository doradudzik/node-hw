const Joi = require("joi");

const registerSchema = Joi.object().keys({
  email: Joi.string().trim().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Enter a valid email",
    "string.required": "Email is required",
  }),
  password: Joi.string()
    .trim()
    .min(6)
    .pattern(/.*[a-z]/, "Password must contain at least one lowercase letter")
    .pattern(/.*[A-Z]/, "Password must contain at least one uppercase letter")
    .pattern(/.*\d/, "Password must contain at least one number")
    .required()
    .messages({
      "string.base":
        "Password must contain: between 6 to 16 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
      "string.min": "Password must contain at least 6 characters",
    }),
});

module.exports = {
  registerSchema,
};
