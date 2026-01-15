import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VOCAB_PATH = path.join(__dirname, '../modernChineseVocab.ts');
const CONSTANTS_PATH = path.join(__dirname, '../constants.ts');

const vocabContent = fs.readFileSync(VOCAB_PATH, 'utf8');
const constantsContent = fs.readFileSync(CONSTANTS_PATH, 'utf8');

const combinedContent = vocabContent + '\n' + constantsContent;

const targetChars = [
    '日', '早', '但', '明', '是', '星', '昨', '借', '时', '晚', '晴', '间', '影', '醒', '错',
    '月', '有', '朋', '期',
    '我', '记', '了', '门', '生'
];

const simplifiedToTraditional = {
    '时': '時',
    '间': '間',
    '门': '門',
    '见': '見',
    '记': '記',
    '错': '錯',
    '为': '為',
    '让': '讓',
    '说': '說',
    '话': '話',
    '贝': '貝',
    '页': '頁',
    '风': '風'
};

const packData = [];

function findCharData(char) {
    // Regex to match object entry: { char: 'X', ... }
    // Matches { char: 'X', pinyin: '...', zhuyin: '...', meaning: '...', difficulty: N ... }
    // Handles escaped quotes in meaning if any.
    const regex = new RegExp(`{ char: '${char}',\\s*pinyin: '([^']*)',\\s*zhuyin: '([^']*)',\\s*meaning: '((?:[^']|\\\\')*)',\\s*difficulty: (\\d+)(?:,\\s*components: \\[([^\\]]*)\\])?`, 'g');

    let match = regex.exec(combinedContent);
    if (match) {
        return {
            char: char,
            pinyin: match[1],
            zhuyin: match[2],
            meaning: match[3],
            difficulty: parseInt(match[4]),
            components: match[5] ? match[5].split(',').map(s => s.trim().replace(/'/g, '')) : undefined
        };
    }
    return null;
}

targetChars.forEach(char => {
    let data = findCharData(char);
    if (!data) {
        const trad = simplifiedToTraditional[char];
        if (trad) {
            data = findCharData(trad);
        }
    }

    if (data) {
        packData.push(data);
    } else {
        // console.warn(`Character not found: ${char}`);
        // Placeholder
        packData.push({
            char: char,
            pinyin: '?',
            zhuyin: '?',
            meaning: '?',
            difficulty: 2
        });
    }
});

console.log(JSON.stringify(packData, null, 2));
