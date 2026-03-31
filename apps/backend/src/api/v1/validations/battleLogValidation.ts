import Joi from "joi";
 
export const battleLogSchema = Joi.object({
    type: Joi.string()
        .valid("system", "ally", "enemy")
        .required(),
    text: Joi.string()
        .min(1)
        .required()
}).messages({
    "any.required": "Field is required",
    "string.empty": "Field cannot be empty",
    "any.only": "Type must be one of: system, ally, enemy"
});