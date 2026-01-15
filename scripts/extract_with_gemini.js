import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Read API Key from .env
const envPath = path.join(__dirname, '../.env');
let apiKey = '';
try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/VITE_FIREBASE_API_KEY=(.*)/);
    if (match && match[1]) {
        apiKey = match[1].trim();
    }
} catch (e) {
    console.error('Error reading .env:', e.message);
    process.exit(1);
}

if (!apiKey) {
    console.error('VITE_FIREBASE_API_KEY not found in .env');
    process.exit(1);
}

// 2. Read PDF
const pdfPath = path.join(__dirname, '../Homework/B1L3-2.pdf');
const pdfData = fs.readFileSync(pdfPath).toString('base64');

// 3. Call Gemini
const ai = new GoogleGenAI({ apiKey });

async function extract() {
    console.log('Sending PDF to Gemini for extraction...');

    // Use gemini-1.5-flash for speed/vision capabilities
    // Note: PDF support is native in 1.5 Pro/Flash
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: `This PDF contains a list of vocabulary words. 
                            Please identify and list ALL the unique Traditional Chinese characters (Hanzi) found in this document.
                            Ignore pinyin or English or Zhuyin components. 
                            I suspect there are around 30 characters.
                            Output ONLY the characters as a single string, e.g. "我你他..."
                            Do not include ANY spaces, punctuation, or other text.`
                        },
                        {
                            inlineData: {
                                mimeType: 'application/pdf',
                                data: pdfData
                            }
                        }
                    ]
                }
            ]
        });

        console.log('--- Extracted Characters ---');
        console.log(response.text());
        console.log('--- End ---');
    } catch (e) {
        console.error('Gemini API Error:', e);
    }
}

extract();
