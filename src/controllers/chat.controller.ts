import { Request, Response } from "express";
import { ChatService } from "../services/chat.service";
import { chatSchema } from "../libs/schemas/chat.schemas";


export class ChatController {

    static getMessages = async (req: Request, res: Response) => {
        const { sessionId } = req.params;
        const messages = await ChatService.getMessages(sessionId);
        res.json(messages);
    }

    static sendMessage = async (req: Request, res: Response) => {

        const validated = chatSchema.parse(req.body)
        const response = await ChatService.sendMessage(validated);
        res.json(response);
    }

    static deleteHistory = async (req: Request, res: Response) => {
        const { sessionId } = req.params;
        const result = await ChatService.deleteHistory(sessionId);
        res.json(result);
    }

}