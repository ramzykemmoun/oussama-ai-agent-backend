import "dotenv/config";

import { GoogleGenerativeAI } from "@google/generative-ai";



const GEMINI_API_KEY = process.env.GEMINI_API_KEY


if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined")
}

export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
