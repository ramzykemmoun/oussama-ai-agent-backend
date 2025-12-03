"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required"),
    lastname: zod_1.default.string().min(1, "Last name is required"),
    email: zod_1.default.email("Invalid email format"),
    password: zod_1.default.string().min(6, "Password must be at least 6 characters"),
});
