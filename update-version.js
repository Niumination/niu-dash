// NIU⚡DASH — version updater
// Run: node update-version.js
// Updates the NIU_VERSION constant in index.html with latest git info
const fs = require('fs');
const { execSync } = require('child_process');

const log = execSync('git log -1 --format="%h|%cI|%s"', { cwd: __dirname }).toString().trim();
const [hash, date, msg] = log.split('|');

// Extract version from commit message (e.g., "v2.13.0 — Fix ...") or fallback
const tagMatch = msg.match(/^(v[\d.]+)\b/);

// Read current version from file for fallback
let currentVer = '2.9.0';
try {
    const currentHtml = fs.readFileSync(__dirname + '/index.html', 'utf8');
    const verMatch = currentHtml.match(/v:'([\d.]+)'/);
    if (verMatch) currentVer = verMatch[1];
} catch(_) {}

const tag = tagMatch ? tagMatch[1].replace(/^v/,'') : currentVer;

const versionStr = `var NIU_VERSION = {v:'${tag}',hash:'${hash}',date:'${date}',msg:${JSON.stringify(msg)}};`;

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
