import * as userSaveService from "../services/userSaveService.js";
import type { Request, Response, NextFunction } from "express";

export async function getUserSave(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).userId as string | null | undefined;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const save = await userSaveService.getUserSave(userId);
    res.json(save);
  } catch (error) {
    next(error);
  }
}

export async function advanceFight(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).userId as string | null | undefined;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const save = await userSaveService.advanceFight(userId);
    res.json(save);
  } catch (error) {
    next(error);
  }
}

export async function resetSave(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).userId as string | null | undefined;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const save = await userSaveService.resetSave(userId);
    res.json(save);
  } catch (error) {
    next(error);
  }
}
