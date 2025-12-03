
const conversationHistories = new Map();

interface Message {
    role: string;
    content: string;
}

function getConversationHistory(sessionId: string) {
    if (!conversationHistories.has(sessionId)) {
        conversationHistories.set(sessionId, []);
    }
    return conversationHistories.get(sessionId);
}

function formatHistoryForGemini(history: Message[]) {
    return history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
    }));
}

