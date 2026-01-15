import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONSTANTS_PATH = path.join(__dirname, '../constants.ts');
let content = fs.readFileSync(CONSTANTS_PATH, 'utf8');

// Replacements
// We want to replace double backslash + quote with single backslash + quote
// AND unescaped quote with single backslash + quote

// 1. Fix double escapes: \\' -> \'
// We search for `\\'` and replace with `\'`
// In regex: /\\\\'/g matches literal \\'
// Replacement: "\\'" (literal \')
// Wait, in JS replace string:
// "\\'" -> \'
// Let's test with specific strings to be safe avoiding regex global mess ups

// Specific fixes based on known issues
const fixes = [
    { s: "Let\\\\'s", r: "Let\\'s" },  // Matches Let\\'s -> Let\'s
    { s: "It\\\\'s", r: "It\\'s" },
    { s: "don\\\\'t", r: "don\\'t" },
    { s: "o\\\\'clock", r: "o\\'clock" },

    // Fix unescaped ones
    { s: "Three o'clock.", r: "Three o\\'clock." },
    { s: "Eight o'clock.", r: "Eight o\\'clock." }
];

let fixedCount = 0;

for (const fix of fixes) {
    // Escape special regex chars if any (none really except backslash)
    // Actually using string replaceAll is better if node version supports it
    // Node 15+ has replaceAll

    // Check if content has the target
    if (content.includes(fix.s.replace(/\\\\/g, '\\'))) {
        // This check is tricky due to JS string escaping confusion.
        // Let's rely on global replace with regex.
    }

    // Regex construction:
    // We want to match literal string fix.s
    // Escape the string to be regex safe
    const regexSafe = fix.s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(regexSafe, 'g');

    const matches = content.match(regex);
    if (matches) {
        console.log(`Found ${matches.length} matches for: ${fix.s}`);
        fixedCount += matches.length;
        content = content.replace(regex, fix.r);
    }
}

// Special case: check for any remaining unescaped 'Let's', 'It's', etc.
// Regex for unescaped: /Let's/g (where ' is NOT preceded by \)
// Lookbehind support in JS? Yes in modern node.
// /(?<!\\)'/ checks for ' not preceded by \
// But we specifically care about "Let's" etc.

const wordFixes = [
    { regex: /Let's/g, repl: "Let\\'s" },
    { regex: /It's/g, repl: "It\\'s" },
    { regex: /don't/g, repl: "don\\'t" },
    { regex: /can't/g, repl: "can\\'t" },
    { regex: /won't/g, repl: "won\\'t" },
    { regex: /o'clock/g, repl: "o\\'clock" }
];

for (const fix of wordFixes) {
    // Only replace if NOT already escaped
    // We can match "word's" and check context or use lookbehind
    // (?<!\\)' matches unescaped quote
    // So /Let(?<!\\)'s/g matches Let's but not Let\'s

    // Construct regex with lookbehind
    const p = fix.regex.source.replace("'", "(?<!\\\\)'");
    const regex = new RegExp(p, 'g');

    const matches = content.match(regex);
    if (matches) {
        console.log(`Found ${matches.length} unescaped matches for pattern: ${regex}`);
        fixedCount += matches.length;
        content = content.replace(regex, fix.repl);
    }
}

fs.writeFileSync(CONSTANTS_PATH, content, 'utf8');
console.log(`Fixed syntax errors. Total corrections: ${fixedCount}`);
