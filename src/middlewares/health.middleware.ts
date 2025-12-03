import { NextFunction, Request, Response } from "express";

export const healthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        activeConversations: conversationHistories.size,
    });
};