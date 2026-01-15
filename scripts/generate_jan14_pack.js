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

// User provided list: 這，那，種，鉛筆，筆，怎麼樣，東西，隻，快，錢，元，便宜，貴，顏色紅色，白色，都，好看，常，穿，衣服，件
// Unique chars:
// 這 那 種 鉛 筆 怎 麼 樣 東 西 隻 快 錢 元 便 宜 貴 顏 色 紅 白 都 好 看 常 穿 衣 服 件
const targetChars = [
    '這', '那', '種', '鉛', '筆',
    '怎', '麼', '樣', '東', '西',
    '隻', '快', '錢', '元', '便',
    '宜', '貴', '顏', '色', '紅',
    '白', '都', '好', '看', '常',
    '穿', '衣', '服', '件'
];

const packData = [];

// Hardcoded data for new characters
const manualData = {
    '種': { pinyin: 'zhǒng', zhuyin: 'ㄓㄨㄥˇ', meaning: 'kind / type', difficulty: 2, exampleSentence: '這是哪種茶？', exampleTranslation: 'What kind of tea is this?' },
    '鉛': { pinyin: 'qiān', zhuyin: 'ㄑㄧㄢ', meaning: 'lead (metal)', difficulty: 2, exampleSentence: '鉛筆。', exampleTranslation: 'Pencil.' },
    '隻': { pinyin: 'zhī', zhuyin: 'ㄓ', meaning: 'measure word for animals', difficulty: 2, exampleSentence: '一隻狗。', exampleTranslation: 'One dog.' },
    '元': { pinyin: 'yuán', zhuyin: 'ㄩㄢˊ', meaning: 'dollar / yuan', difficulty: 2, exampleSentence: '五百元。', exampleTranslation: '500 yuan.' },
    '便': { pinyin: 'pián', zhuyin: 'ㄆㄧㄢˊ', meaning: 'cheap (便宜)', difficulty: 2, exampleSentence: '很便宜。', exampleTranslation: 'Very cheap.' },
    '宜': { pinyin: 'yí', zhuyin: 'ㄧˊ', meaning: 'suitable / cheap (便宜)', difficulty: 2, exampleSentence: '便宜。', exampleTranslation: 'Cheap.' },
    '顏': { pinyin: 'yán', zhuyin: 'ㄧㄢˊ', meaning: 'color (顏色)', difficulty: 2, exampleSentence: '什麼顏色？', exampleTranslation: 'What color?' },
    '色': { pinyin: 'sè', zhuyin: 'ㄙㄜˋ', meaning: 'color (顏色)', difficulty: 1, exampleSentence: '紅色。', exampleTranslation: 'Red.' },
    '衣': { pinyin: 'yī', zhuyin: 'ㄧ', meaning: 'clothes (衣服)', difficulty: 2, exampleSentence: '穿衣服。', exampleTranslation: 'Wear clothes.' },
    '服': { pinyin: 'fú', zhuyin: 'ㄈㄨˊ', meaning: 'clothes (衣服)', difficulty: 2, exampleSentence: '衣服。', exampleTranslation: 'Clothes.' }
};

function findCharData(char) {
    // 1. Check manual overrides first
    if (manualData[char]) {
        return { char, ...manualData[char] };
    }

    // 2. Regex to match object entry in existing code
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
    if (data) {
        packData.push(data);
    } else {
        // Fallback or placeholder
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
