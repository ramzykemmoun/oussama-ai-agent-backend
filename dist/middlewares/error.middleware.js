"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    console.error(" Server error:", err);
    res.status(500).json({
        success: false,
        error: "Internal server error"
    });
};
exports.errorMiddleware = errorMiddleware;
