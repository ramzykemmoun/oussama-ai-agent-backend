"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
require("dotenv/config");
const zod_1 = __importDefault(require("zod"));
const gemini_1 = require("../libs/ai/models/gemini");
const markdown_1 = require("../libs/markdown");
const SYSTEM_PROMPT = (0, markdown_1.readMarkdown)('oussama.md');
class ChatService {
}
exports.ChatService = ChatService;
_a = ChatService;
ChatService.getMessages = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = getConversationHistory(sessionId);
        return {
            success: true,
            history,
            sessionId,
            messageCount: history.length / 2,
        };
    }
    catch (err) {
        console.error(" Chat error:", err);
        return {
            success: false,
            error: "Une erreur est survenue lors du traitement de votre message",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
        };
    }
});
ChatService.sendMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, sessionId } = data;
        const currentSessionId = sessionId || "default-session";
        const history = getConversationHistory(currentSessionId);
        const model = gemini_1.genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: SYSTEM_PROMPT,
        });
        const chat = model.startChat({
            history: formatHistoryForGemini(history),
            generationConfig: {
                maxOutputTokens: 2000,
                temperature: 0.9,
                topP: 0.95,
            },
        });
        const result = yield chat.sendMessage(message);
        const responseText = result.response.text();
        history.push({ role: "user", content: message }, { role: "model", content: responseText });
        if (history.length > 20) {
            history.splice(0, history.length - 20);
        }
        return {
            success: true,
            response: responseText,
            sessionId: currentSessionId,
            messageCount: history.length / 2,
        };
    }
    catch (err) {
        console.error(" Chat error:", err);
        if (err instanceof zod_1.default.ZodError) {
            return {
                success: false,
                error: err.message,
                code: 400,
            };
        }
        return {
            success: false,
            error: "Une erreur est survenue lors du traitement de votre message",
            details: process.env.NODE_ENV === "development" ? err.message : undefined,
            code: 500,
        };
    }
});
ChatService.deleteHistory = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    conversationHistories.delete(sessionId);
    return {
        success: true,
        message: "Conversation history cleared"
    };
});
