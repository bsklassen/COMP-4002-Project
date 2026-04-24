import { Router } from "express";
import * as controller from "../controllers/userSaveController.js";
import { findOrCreateUser } from "../middleware/findOrCreateUser.js";

const router = Router();

router.get("/", findOrCreateUser, controller.getUserSave);
router.post("/advance", findOrCreateUser, controller.advanceFight);
router.post("/reset", findOrCreateUser, controller.resetSave);

export default router;
