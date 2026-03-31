import type { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(
    {
      body: req.body,
      params: req.params,
      query: req.query,
    },
    {
      allowUnknown: true,
      abortEarly: false,
    }
  );

  if (error) {
    return res.status(400).json({ error: "Invalid request", details: error.details });
  }

  next();
};
