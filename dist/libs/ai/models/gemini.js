"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genAI = void 0;
require("dotenv/config");
const generative_ai_1 = require("@google/generative-ai");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
}
exports.genAI = new generative_ai_1.GoogleGenerativeAI(GEMINI_API_KEY);
