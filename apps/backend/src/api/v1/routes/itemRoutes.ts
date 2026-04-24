import express, {Router} from "express";
import * as itemController from "../controllers/itemController.js"
import { findOrCreateUser } from "../middleware/findOrCreateUser.js";

const router: Router = express.Router();

router.get("/items", itemController.getDroppedItems);
router.post("/items/discard", itemController.discardItems);
router.post("/items/clear", itemController.clearUserItems);
router.get("/items/inventory", findOrCreateUser, itemController.getUserItems);
router.post("/items/use", itemController.removeUserItem);
router.post("/items/grant", itemController.grantItems);

export default router