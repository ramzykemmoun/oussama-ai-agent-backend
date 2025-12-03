"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMarkdown = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const markdownDir = path_1.default.join(__dirname, 'ai', 'prompts');
const readMarkdown = (filePath) => {
    console.log(markdownDir);
    const file = fs_1.default.readFileSync(path_1.default.join(markdownDir, filePath), 'utf-8');
    return file;
};
exports.readMarkdown = readMarkdown;
