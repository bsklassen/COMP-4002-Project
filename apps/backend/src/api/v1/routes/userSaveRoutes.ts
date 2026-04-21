import { Router } from "express";
import * as controller from "../controllers/userSaveController.js";
import { findOrCreateUser } from "../middleware/findOrCreateUser.js";

const router = Router();

router.get("/", controller.getUserSave);
router.post("/advance", controller.advanceFight);
router.post("/reset", controller.resetSave);

export default router;
