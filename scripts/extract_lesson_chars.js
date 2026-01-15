import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INDEX_PATH = path.join(__dirname, '../public/pdf-index.json');

const data = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));

// Check pages 69-75 for Lesson 3 Vocab (based on previous text search)
for (let p = 69; p <= 75; p++) {
    const page = data.find(i => i.pageNumber === p);
    if (page) {
        console.log(`\n--- Page ${p} ---`);
        console.log(page.text);
    }
}
