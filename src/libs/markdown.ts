import fs from 'fs';
import path from 'path';

const markdownDir = path.join(__dirname, 'ai', 'prompts');

export const readMarkdown = (filePath: string): string => {
    console.log(markdownDir);
    const file = fs.readFileSync(path.join(markdownDir, filePath), 'utf-8');
    return file;
}