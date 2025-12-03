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
exports.UserController = void 0;
const user_schemas_1 = require("../libs/schemas/user.schemas");
const user_service_1 = require("../services/user.service");
class UserController {
}
exports.UserController = UserController;
_a = UserController;
UserController.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validated = user_schemas_1.userSchema.parse(req.body);
    const user = yield user_service_1.UserService.register(validated);
    res.json(user);
});
