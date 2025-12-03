"use strict";
const conversationHistories = new Map();
function getConversationHistory(sessionId) {
    if (!conversationHistories.has(sessionId)) {
        conversationHistories.set(sessionId, []);
    }
    return conversationHistories.get(sessionId);
}
function formatHistoryForGemini(history) {
    return history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
    }));
}
