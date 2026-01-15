import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = path.join(__dirname, '../Homework/B1L3-2.pdf');

async function extract() {
    console.log('Reading PDF:', PDF_PATH);
    const dataBuffer = fs.readFileSync(PDF_PATH);
    const uint8Array = new Uint8Array(dataBuffer);

    const loadingTask = pdfjsLib.getDocument({
        data: uint8Array,
        useSystemFonts: true,
        disableFontFace: true,
    });

    const pdfDocument = await loadingTask.promise;
    console.log('Pages:', pdfDocument.numPages);

    let fullText = '';
    for (let i = 1; i <= pdfDocument.numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map(item => item.str).join(' ');
        fullText += text + '\n';
    }

    // Matches common CJK ranges
    const params = fullText.match(/[\u4e00-\u9fa5]/g);

    if (params) {
        // Unique characters
        const unique = [...new Set(params)];
        console.log('Unique Hanzi found:', unique.length);
        console.log(unique.join(''));
    } else {
        console.log('No Hanzi found.');
    }
}

extract().catch(console.error);
