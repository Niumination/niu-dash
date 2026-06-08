// NIU⚡DASH — version updater
// Run: node update-version.js
// Updates the NIU_VERSION constant in index.html with latest git info
const fs = require('fs');
const { execSync } = require('child_process');

const log = execSync('git log -1 --format="%h|%cI|%s"', { cwd: __dirname }).toString().trim();
const [hash, date, msg] = log.split('|');

const versionStr = `var NIU_VERSION = {v:'2.9.0',hash:'${hash}',date:'${date}',msg:${JSON.stringify(msg)}};`;

let html = fs.readFileSync(__dirname + '/index.html', 'utf8');
const re = /var NIU_VERSION = \{v:'[\d.]+',hash:'[a-f0-9]+',date:'[^']+',msg:[^;]+};/;

if (re.test(html)) {
    html = html.replace(re, versionStr);
} else {
    // Insert after the first <script> tag
    html = html.replace('<script>', '<script>\n' + versionStr);
}

fs.writeFileSync(__dirname + '/index.html', html);
console.log('✅ Version updated:', versionStr);
