import { Router } from "express";
import * as controller from "../controllers/battleController.js";
import { findOrCreateUser } from "../middleware/findOrCreateUser.js";

const router = Router();

router.post("/start", findOrCreateUser, controller.startBattle);
router.post("/:id/action", controller.playerAction);

export default router;
