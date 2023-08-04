const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z]{3,30}$/)
    .required()
    .messages({ "string.pattern.base": "Name must contain only letters." }),
  email: Joi.string().trim().email(),
  phone: Joi.string()
    .trim()
    .min(3)
    .max(16)
    .pattern(/^\d{3,16}$/)
    .required()
    .messages({ "string.pattern.base": "Phone must contain only numbers." }),
});

module.exports = schema;
