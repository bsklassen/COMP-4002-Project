import { Router } from "express";
import * as controller from "../controllers/authController.ts";
import { validate } from "../middleware/validate.ts";
import { z } from "zod";

const router = Router();

const authPayloadSchema = z.object({
  body: z.object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const idParamSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

router.post("/login", validate(authPayloadSchema), controller.login);
router.post("/register", validate(authPayloadSchema), controller.register);
router.get("/users", controller.getUsers);
router.delete("/users/:id", validate(idParamSchema), controller.deleteUser);

export default router;
