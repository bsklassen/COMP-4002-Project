import { Router } from "express";
import * as controller from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import Joi from "joi";

const router = Router();

const authPayloadSchema = Joi.object({
  body: Joi.object({
    username: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
});

const idParamSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().min(1).required(),
  }),
});

router.post("/login", validate(authPayloadSchema), controller.login);
router.post("/register", validate(authPayloadSchema), controller.register);
router.get("/users", controller.getUsers);
router.delete("/users/:id", validate(idParamSchema), controller.deleteUser);

export default router;
