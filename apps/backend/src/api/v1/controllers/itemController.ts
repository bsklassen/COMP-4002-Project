import { type Request, type Response, type NextFunction } from "express";
import { successResponse } from "../models/responseModel.ts";
import * as itemService from "../services/itemService.ts"

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
