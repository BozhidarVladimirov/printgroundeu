const fs = require('fs');
const path = 'C:/Users/User/Desktop/OPEN CODE PROJECT/wc-product-export-30-3-2026-1774877107115.csv';

let content = fs.readFileSync(path, 'utf8');
// Remove BOM if present
if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
}
const lines = content.split('\n');
const headerLine = lines[0];
console.log('Header line (first 500 chars):', headerLine.substring(0, 500));

// Parse CSV properly - handling quoted fields
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}

const headers = parseCSVLine(headerLine);
console.log('\nTotal headers:', headers.length);
console.log('First 10 headers:', headers.slice(0, 10));

// Find column indices
const typeIdx = headers.indexOf('Вид');
const skuIdx = headers.indexOf('Код');
const nameIdx = headers.indexOf('Име');

console.log('\nType column index:', typeIdx);
console.log('SKU column index:', skuIdx);
console.log('Name column index:', nameIdx);

// Find technique columns
const techCols = headers.map((h, i) => ({ header: h, idx: i })).filter(h => h.header.toLowerCase().includes('technique'));
console.log('\nTechnique columns found:', techCols.length);
console.log('First 5 tech columns:', techCols.slice(0, 5).map(t => t.header));

// Count variations and analyze techniques
let variations = 0;
let simpleProducts = 0;
let groupedProducts = 0;
let withTech = 0;
let withoutTech = 0;
const skusWithoutTech = [];
const typeBreakdown = {};

for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const cols = parseCSVLine(lines[i]);
    const type = cols[typeIdx] || '';
    const sku = cols[skuIdx] || '';
    
    typeBreakdown[type] = (typeBreakdown[type] || 0) + 1;
    
    if (type === 'variation') variations++;
    else if (type === 'simple') simpleProducts++;
    else if (type === 'grouped') groupedProducts++;
    
    // Check for techniques
    let hasTech = false;
    for (const techCol of techCols) {
        const val = cols[techCol.idx];
        if (val && val.trim()) {
            hasTech = true;
            break;
        }
    }
    
    if (hasTech) withTech++;
    else {
        withoutTech++;
        if (skusWithoutTech.length < 30) {
            const name = cols[nameIdx] || '';
            skusWithoutTech.push({ sku, type, name: name.substring(0, 50) });
        }
    }
}

console.log('\n=== SUMMARY ===');
console.log('Total rows analyzed:', lines.length - 1);
console.log('Type breakdown:', typeBreakdown);
console.log('Variations:', variations);
console.log('Simple products:', simpleProducts);
console.log('Grouped products:', groupedProducts);
console.log('With techniques:', withTech);
console.log('Without techniques:', withoutTech);

console.log('\n=== SAMPLE SKUs WITHOUT TECHNIQUES ===');
skusWithoutTech.forEach(p => console.log(`SKU: ${p.sku} | Type: ${p.type} | Name: ${p.name}`));

// Now check products-imported.ts
console.log('\n=== CHECKING products-imported.ts ===');
const importedPath = 'C:/Users/User/Desktop/OPEN CODE PROJECT/eu-printground/src/data/products-imported.ts';
const importedContent = fs.readFileSync(importedPath, 'utf8');

// Extract SKUs from products-imported.ts
const skuRegex = /sku:\s*["']([^"']+)["']/g;
const importedSkus = [];
let match;
while ((match = skuRegex.exec(importedContent)) !== null) {
    importedSkus.push(match[1]);
}
console.log('Total SKUs in products-imported.ts:', importedSkus.length);

// Find CSV SKUs
const csvSkus = new Set();
for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const cols = parseCSVLine(lines[i]);
    const sku = cols[skuIdx];
    if (sku) csvSkus.add(sku);
}
console.log('Total SKUs in CSV:', csvSkus.size);

// Find SKUs in imported but not in CSV
const missingFromCsv = importedSkus.filter(s => !csvSkus.has(s));
console.log('\nSKUs in products-imported.ts but NOT in CSV:', missingFromCsv.length);
console.log('First 20 missing SKUs:', missingFromCsv.slice(0, 20));

// Find SKUs in CSV but not in imported
const missingFromImported = [...csvSkus].filter(s => !importedSkus.includes(s));
console.log('\nSKUs in CSV but NOT in products-imported.ts:', missingFromImported.length);
console.log('First 20 extra SKUs:', missingFromImported.slice(0, 20));
