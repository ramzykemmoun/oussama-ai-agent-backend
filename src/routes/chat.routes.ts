import express from "express";
import { ChatController } from "../controllers/chat.controller";
const router = express.Router();


router.post('/', ChatController.sendMessage)
router.get('/history/:sessionId', ChatController.getMessages)
router.delete('/history/:sessionId', ChatController.deleteHistory)

export default router
