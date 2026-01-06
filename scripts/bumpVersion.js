
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const packageJsonPath = path.join(rootDir, 'package.json');
const constantsPath = path.join(rootDir, 'constants.ts');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const currentVersion = packageJson.version;

// Parse version
const [major, minor, patch] = currentVersion.split('.').map(Number);
const newVersion = `${major}.${minor}.${patch + 1}`;

// Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Update constants.ts
let constantsContent = fs.readFileSync(constantsPath, 'utf-8');
const versionRegex = /export const APP_VERSION = "[\d\.]+";/;
const newVersionLine = `export const APP_VERSION = "${newVersion}";`;

if (versionRegex.test(constantsContent)) {
    constantsContent = constantsContent.replace(versionRegex, newVersionLine);
} else {
    console.error('Could not find APP_VERSION in constants.ts');
    process.exit(1);
}

fs.writeFileSync(constantsPath, constantsContent);

console.log(`Bumped version from ${currentVersion} to ${newVersion}`);
