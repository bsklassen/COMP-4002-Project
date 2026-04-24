import { type Request, type Response, type NextFunction } from "express";
import { successResponse } from "../models/responseModel.js";
import * as itemService from "../services/itemService.js"

export const getDroppedItems = async(
    _req: Request,
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const items = await itemService.getDroppedItems();
        res.status(200).json(
            successResponse(items, "Dropped item retrieved.")
        );
    } catch(error) {
        next(error);
    }
}

export const discardItems = async (
    req: Request,
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        await itemService.discardItems(req.body.itemIds);
        res.status(200).json(
            successResponse(null, "items discarded successfully")
        );
    } catch(error) {
        next(error);
    }
};

export const clearUserItems = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = ((req as any).user?.id ?? req.headers["x-user-id"]) as string | undefined;
        if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }
        await itemService.clearUserItems(userId);
        res.status(200).json(successResponse(null, "All user items cleared"));
    } catch(error) {
        next(error);
    }
};

export const getUserItems = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = (req as any).userId as string | undefined;
        if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }
        const items = await itemService.getUserItems(userId);
        res.status(200).json(successResponse(items, "User items retrieved"));
    } catch(error) {
        next(error);
    }
};

export const removeUserItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = ((req as any).user?.id ?? req.headers["x-user-id"]) as string | undefined;
        if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }
        const { itemId } = req.body;
        if (typeof itemId !== "number") { res.status(400).json({ error: "itemId (number) required" }); return; }
        const removed = await itemService.removeUserItem(userId, itemId);
        if (!removed) { res.status(404).json({ error: "Item not found in inventory" }); return; }
        res.status(200).json(successResponse(null, "Item removed from inventory"));
    } catch(error) {
        next(error);
    }
};

export const grantItems = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = ((req as any).user?.id ?? req.headers["x-user-id"]) as string | undefined;
        if (!userId) { res.status(401).json({ error: "Unauthorized" }); return; }
        const { itemIds } = req.body;
        if (!Array.isArray(itemIds)) { res.status(400).json({ error: "itemIds (number[]) required" }); return; }
        await itemService.grantItems(userId, itemIds);
        res.status(200).json(successResponse(null, "Items granted to user"));
    } catch(error) {
        next(error);
    }
};
