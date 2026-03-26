import { Request, Response, NextFunction } from "express";
import { BattleLogMessage } from "@prisma/client";
import * as battleLogService from "../services/battleLogService";
import { successResponse } from "../models/responseModel";
 
// Get all battle log messages
export const getAllMessages = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const messages: BattleLogMessage[] = await battleLogService.fetchAllMessages();
        res.json(successResponse(messages, "Messages retrieved successfully"));
    } catch (error) {
        next(error);
    }
};
 
// Get a single battle log message by ID
export const getMessageById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const message: BattleLogMessage | null =
            await battleLogService.fetchMessagesById(
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
 
// Create a new battle log message
export const createMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { text } = req.body;
        const message: BattleLogMessage = await battleLogService.addSystemMessage(text);
        res.status(201).json(successResponse(message, "Message created successfully"));
    } catch (error) {
        next(error);
    }
};
 
// Start a new battle - clears all messages and adds initial message
export const startBattle = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const message: BattleLogMessage = await battleLogService.startNewBattle();
        res.status(201).json(successResponse(message, "Battle started successfully"));
    } catch (error) {
        next(error);
    }
};
 
// Process an attack action
export const attack = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const messages: BattleLogMessage[] = await battleLogService.processAttackAction();
        res.status(201).json(successResponse(messages, "Attack processed successfully"));
    } catch (error) {
        next(error);
    }
};
 
// Process a skill action
export const skill = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const messages: BattleLogMessage[] = await battleLogService.processSkillAction();
        res.status(201).json(successResponse(messages, "Skill processed successfully"));
    } catch (error) {
        next(error);
    }
};
 
// Process a guard action
export const guard = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const message: BattleLogMessage = await battleLogService.processGuardAction();
        res.status(201).json(successResponse(message, "Guard processed successfully"));
    } catch (error) {
        next(error);
    }
};