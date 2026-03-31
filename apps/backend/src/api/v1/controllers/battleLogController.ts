import type { Request, Response, NextFunction } from "express";
import type { BattleLogMessage } from "@prisma/client";
import * as battleLogService from "../services/battleLogService.js";
import { successResponse } from "../models/responseModel.js";
 
/**
 * Controller methods determine how to handle requests and respond to requests.
 * It sends the appropriate components of the request to services (if needed)
 * and responds to the request with an appropriate code/body.
 */
 
export const getAllMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = req.query.userId as string;
        if (!userId) {
            res.status(400).json({ error: "userId is required" });
            return;
        }
        const messages: BattleLogMessage[] = await battleLogService.fetchAllMessages(userId);
        res.status(200).json(
            successResponse(messages, "Messages retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};
 
export const getMessageById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const message: BattleLogMessage | null =
            await battleLogService.fetchMessageById(
                Number.parseInt(req.params.id as string)
            );
        if (message) {
            res.json(successResponse(message, "Message retrieved successfully"));
        } else {
            throw new Error("Message not found");
        }
    } catch (error) {
        next(error);
    }
};
 
export const createMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { text, userId } = req.body;
        const newMessage = await battleLogService.addSystemMessage(text, userId);
        res.status(201).json(
            successResponse(newMessage, "Message created successfully")
        );
    } catch (error) {
        next(error);
    }
};
 
export const startBattle = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({ error: "userId is required" });
            return;
        }
        const message: BattleLogMessage = await battleLogService.startNewBattle(userId);
        res.status(201).json(
            successResponse(message, "Battle started successfully")
        );
    } catch (error) {
        next(error);
    }
};
 
export const attack = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({ error: "userId is required" });
            return;
        }
        const messages: BattleLogMessage[] = await battleLogService.processAttackAction(userId);
        res.status(201).json(
            successResponse(messages, "Attack processed successfully")
        );
    } catch (error) {
        next(error);
    }
};
 
export const skill = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({ error: "userId is required" });
            return;
        }
        const messages: BattleLogMessage[] = await battleLogService.processSkillAction(userId);
        res.status(201).json(
            successResponse(messages, "Skill processed successfully")
        );
    } catch (error) {
        next(error);
    }
};
 
export const guard = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({ error: "userId is required" });
            return;
        }
        const message: BattleLogMessage = await battleLogService.processGuardAction(userId);
        res.status(201).json(
            successResponse(message, "Guard processed successfully")
        );
    } catch (error) {
        next(error);
    }
};