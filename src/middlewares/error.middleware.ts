import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(" Server error:", err);
    res.status(500).json({
        success: false,
        error: "Internal server error"
    });
};