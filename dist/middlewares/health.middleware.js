"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthMiddleware = void 0;
const healthMiddleware = (req, res, next) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        activeConversations: conversationHistories.size,
    });
};
exports.healthMiddleware = healthMiddleware;
