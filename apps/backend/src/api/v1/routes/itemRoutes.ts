import express, {Router} from "express";
import * as itemController from "../controllers/itemController"

const router: Router = express.Router();

router.get("/items", itemController.getDroppedItems);
router.post("/items/discard", itemController.discardItems);

export default router