import express, { Router } from "express";
import { validate } from "../middleware/validate.js";
import { battleLogSchema } from "../validations/battleLogValidation.js";
import * as battleLogController from "../controllers/battleLogController.js";
 
const router: Router = express.Router();
 
// GET all battle log messages
router.get("/battlelogs", battleLogController.getAllMessages);
 
// GET a single battle log message by ID
router.get("/battlelogs/:id", battleLogController.getMessageById);
 
// POST a new battle log message
router.post("/battlelogs", validate(battleLogSchema), battleLogController.createMessage);
 
// POST to start a new battle - clears all messages
router.post("/battlelogs/start", battleLogController.startBattle);
 
// POST to process an attack action
router.post("/battlelogs/attack", battleLogController.attack);
 
// POST to process a skill action
router.post("/battlelogs/skill", battleLogController.skill);
 
// POST to process a guard action
router.post("/battlelogs/guard", battleLogController.guard);
 
export default router;