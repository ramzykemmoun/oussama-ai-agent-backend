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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const chat_service_1 = require("../services/chat.service");
const chat_schemas_1 = require("../libs/schemas/chat.schemas");
class ChatController {
}
exports.ChatController = ChatController;
_a = ChatController;
ChatController.getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId } = req.params;
    const messages = yield chat_service_1.ChatService.getMessages(sessionId);
    res.json(messages);
});
ChatController.sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validated = chat_schemas_1.chatSchema.parse(req.body);
    const response = yield chat_service_1.ChatService.sendMessage(validated);
    res.json(response);
});
ChatController.deleteHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId } = req.params;
    const result = yield chat_service_1.ChatService.deleteHistory(sessionId);
    res.json(result);
});
