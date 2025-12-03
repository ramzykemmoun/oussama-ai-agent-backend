
import "dotenv/config";
import z from "zod";
import { genAI } from "../libs/ai/models/gemini";
import { readMarkdown } from "../libs/markdown";
import { ChatSchema } from "../libs/schemas/chat.schemas";


const SYSTEM_PROMPT = readMarkdown('oussama.md')

export class ChatService {


    static getMessages = async (sessionId: string) => {
        try {

            const history = getConversationHistory(sessionId);

            return {
                success: true,
                history,
                sessionId,
                messageCount: history.length / 2,
            }
        } catch (err: any) {
            console.error(" Chat error:", err);
            return {
                success: false,
                error: "Une erreur est survenue lors du traitement de votre message",
                details: process.env.NODE_ENV === "development" ? err.message : undefined,
            }
        }
    }

    static sendMessage = async (data: ChatSchema) => {
        try {
            const { message, sessionId } = data;

            const currentSessionId = sessionId || "default-session";

            const history = getConversationHistory(currentSessionId);

            const model = genAI.getGenerativeModel({
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

            const result = await chat.sendMessage(message);
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
            }

        } catch (err: any) {
            console.error(" Chat error:", err);

            if (err instanceof z.ZodError) {
                return {
                    success: false,
                    error: err.message,
                    code: 400,
                }
            }

            return {
                success: false,
                error: "Une erreur est survenue lors du traitement de votre message",
                details: process.env.NODE_ENV === "development" ? err.message : undefined,
                code: 500,
            }
        }
    }

    static deleteHistory = async (sessionId: string) => {
        conversationHistories.delete(sessionId);
        return {
            success: true,
            message: "Conversation history cleared"
        };
    }
}