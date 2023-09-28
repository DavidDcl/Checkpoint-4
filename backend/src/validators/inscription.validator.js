const Joi = require("joi");

const schemaInscription = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().min(8).required(),

  passwordConfirm: Joi.ref("password"),
});
module.exports = schemaInscription;
