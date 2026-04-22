import { User } from "@prisma/client";
import * as userService from "../services/userService.js";
import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
 
/**
 * If a sessionToken is included in Authorization header, get userId from Clerk.
 * If user does not exist in our database, add them.
 * Stores userId on req.userId for downstream controllers.
 */
export const findOrCreateUser = async (
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Clerk getAuth method authenticates user against HTTP request Authorization header
        const auth = getAuth(req);
        const userId = auth.userId;
 
        // Store in simple userId table
        if (userId) {
            let backendUser: User | null = await userService.getUserById(userId);
            if (!backendUser) {
                backendUser = await userService.createUser({ id: userId });
            }
        }
 
        // If userId not found with auth, set userId to null
        // Prevents userId from being included erroneously in the request body
        (req as any).userId = userId
        next();
    } catch (error) {
        next(error);
    }
};