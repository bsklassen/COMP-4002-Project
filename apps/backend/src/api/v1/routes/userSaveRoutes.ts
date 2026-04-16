import { Router } from "express";
import * as controller from "../controllers/userSaveController.js";

const router = Router();

router.get("/", controller.getUserSave);
router.post("/advance", controller.advanceFight);
router.post("/reset", controller.resetSave);

export default router;
