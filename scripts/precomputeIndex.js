import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Keep this as it's used for __filename/__dirname
// Note: pdf-parse default export might be tricky in ESM.
// If 'pdf-parse' main entry point is CJS, we might need:
// import pdfParse from 'pdf-parse';
// But let's try strict import first. Using createRequire is safest for CJS libs in ESM.

// Use pdfjs-dist legacy build for Node.js support
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

import { pipeline, env } from '@xenova/transformers';

// Configure Transformers for Node
env.allowLocalModels = false;
env.useBrowserCache = false;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = path.join(__dirname, '../public/reference_book.pdf');
const OUTPUT_PATH = path.join(__dirname, '../public/pdf-index.json');
const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';

async function main() {
    console.log('📦 Starting PDF Index Pre-computation...');

    if (!fs.existsSync(PDF_PATH)) {
        console.error('❌ PDF not found at:', PDF_PATH);
        process.exit(1);
    }

    // Load PDF using PDF.js
    const dataBuffer = fs.readFileSync(PDF_PATH);
    const uint8Array = new Uint8Array(dataBuffer);

    const loadingTask = pdfjsLib.getDocument({
        data: uint8Array,
        useSystemFonts: true,
        disableFontFace: true,
    });

    const pdfDocument = await loadingTask.promise;
    console.log(`📖 PDF Loaded. Total pages: ${pdfDocument.numPages}`);

    const pages = [];
    // Start from page 1 start to ensure we capture everything, filter later
    for (let i = 1; i <= pdfDocument.numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map(item => item.str).join(' ');

        pages.push({
            pageNumber: i,
            text: text
        });
    }

    console.log(`✅ Extracted text from ${pages.length} pages.`);

    // 3. Generate Embeddings
    console.log(`🧠 Loading model ${MODEL_NAME}...`);
    const extractor = await pipeline('feature-extraction', MODEL_NAME);

    const index = [];
    const START_PAGE = 14;

    console.log('⚡ Generating embeddings...');
    for (const page of pages) {
        if (page.pageNumber < START_PAGE) continue;

        const cleanText = page.text.replace(/\s+/g, ' ').trim();

        if (cleanText.length > 50) {
            const output = await extractor(cleanText, { pooling: 'mean', normalize: true });
            const embedding = Array.from(output.data);

            index.push({
                pageNumber: page.pageNumber,
                text: cleanText,
                embedding: embedding
            });
            process.stdout.write(`\rProcessed page ${page.pageNumber}/${pages.length}`);
        }
    }

    console.log('\n💾 Saving index...');
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(index));
    console.log(`✨ Done! Saved ${index.length} indexed pages to ${OUTPUT_PATH} (${(fs.statSync(OUTPUT_PATH).size / 1024 / 1024).toFixed(2)} MB)`);
}

main().catch(console.error);
