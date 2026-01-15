import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdf from 'pdf-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = path.join(__dirname, '../Homework/B1L3-2.pdf');

async function extract() {
    console.log('Reading PDF with pdf-parse:', PDF_PATH);
    const dataBuffer = fs.readFileSync(PDF_PATH);

    try {
        const data = await pdf(dataBuffer);
        console.log('Pages:', data.numpages);
        console.log('Text Content Length:', data.text.length);
        console.log('--- Start Text ---');
        console.log(data.text.substring(0, 500));
        console.log('--- End Text ---');

        const params = data.text.match(/[\u4e00-\u9fa5]/g);
        if (params) {
            const unique = [...new Set(params)];
            console.log('Unique Hanzi found:', unique.length);
            console.log(unique.join(''));
        } else {
            console.log('No Hanzi found.');
        }

    } catch (e) {
        console.error('Error:', e);
    }
}

extract();
