import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONSTANTS_PATH = path.join(__dirname, '../constants.ts');
const content = fs.readFileSync(CONSTANTS_PATH, 'utf8');

// Simple regex to find char objects
const charRegex = /{ char: '([^']+)',[^}]+}/g;
const hasExampleRegex = /exampleSentence:/;

let match;
const missing = [];

while ((match = charRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const char = match[1];

    if (!hasExampleRegex.test(fullMatch)) {
        missing.push(char);
    }
}

console.log(JSON.stringify(missing));
console.log(`Total missing: ${missing.length}`);
