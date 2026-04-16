import * as enemyService from "../services/enemyService.js";
import type { Request, Response, NextFunction } from "express";

export async function getAllEnemies(req: Request, res: Response, next: NextFunction) {
  try {
    const enemies = await enemyService.getAllEnemies();
    res.json(enemies);
  } catch (error) {
    next(error);
  }
}

export async function getEnemyByOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const order = parseInt(req.params.order as string, 10);
    if (isNaN(order)) return res.status(400).json({ error: "Invalid order parameter" });
    const enemy = await enemyService.getEnemyByOrder(order);
    if (!enemy) return res.status(404).json({ error: "Enemy not found" });
    res.json(enemy);
  } catch (error) {
    next(error);
  }
}
