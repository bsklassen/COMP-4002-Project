import * as authService from "../services/authService.js";
import type { Request, Response, NextFunction } from "express";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, password } = req.body;
    const user = await authService.login(username, email, password);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = req.body;
    const user = await authService.register(newUser);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await authService.getSavedUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const deleted = await authService.removeUser(id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
