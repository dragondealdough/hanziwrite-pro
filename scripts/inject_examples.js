import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EXAMPLES } from './examples_data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONSTANTS_PATH = path.join(__dirname, '../constants.ts');
let content = fs.readFileSync(CONSTANTS_PATH, 'utf8');

// Regex to match char objects
// This regex captures the character inside the object
const charRegex = /({[^}]*char:\s*'([^']+)'[^}]*})/g;

let count = 0;

const newContent = content.replace(charRegex, (match, objectBody, char) => {
    // Check if it already has 'exampleSentence:'
    if (objectBody.includes('exampleSentence:')) {
        return match; // Already has one
    }

    const data = EXAMPLES[char];
    if (data) {
        count++;
        // Insert exampleSentence before the closing brace
        return objectBody.replace(/(\s*})$/, `, exampleSentence: '${data.s}', exampleTranslation: '${data.t}'$1`);
    }

    return match;
});

fs.writeFileSync(CONSTANTS_PATH, newContent, 'utf8');
console.log(`Injected ${count} example sentences.`);
