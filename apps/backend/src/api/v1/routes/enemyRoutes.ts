import { Router } from "express";
import * as controller from "../controllers/enemyController.js";

const router = Router();

router.get("/", controller.getAllEnemies);
router.get("/order/:order", controller.getEnemyByOrder);

export default router;
