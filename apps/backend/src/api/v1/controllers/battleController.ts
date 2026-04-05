import * as battleService from "../services/battleService.js";
import type { Request, Response, NextFunction } from "express";

export async function startBattle(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = ((req as any).user?.id ?? req.headers["x-user-id"]) as string | undefined;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const { enemyId } = req.body;
    if (typeof enemyId !== "number") return res.status(400).json({ error: "enemyId (number) is required" });
    const battle = await battleService.startBattle(userId, enemyId);
    res.status(201).json(battle);
  } catch (error) {
    next(error);
  }
}

const VALID_ACTIONS = new Set(["attack", "skill", "heal", "guard"]);

export async function playerAction(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: battleId } = req.params as { id: string };
    const { action } = req.body;
    if (!VALID_ACTIONS.has(action)) {
      return res.status(400).json({ error: "action must be one of: attack, skill, heal, guard" });
    }
    const result = await battleService.playerAction(battleId, action);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
