import Joi, { ObjectSchema } from "joi";

// https://stackoverflow.com/questions/42656549/joi-validation-of-array
export const itemSchema: ObjectSchema = Joi.object({
    itemId: Joi.array().items(Joi.number().integer()).min(1).required().messages({
        "any.required": "Item ID requ8ired",
        "array.min": "please select at least on item"
    })
});