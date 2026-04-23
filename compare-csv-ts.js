const fs = require('fs');

// Load CSV file
let csvContent = fs.readFileSync('C:/Users/User/Desktop/OPEN CODE PROJECT/wc-product-export-30-3-2026-1774877107115.csv', 'utf8');
if (csvContent.charCodeAt(0) === 0xFEFF) {
    csvContent = csvContent.slice(1);
}
const csvLines = csvContent.split('\n');

// Parse CSV header
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if ((char === '"' || char === "'") && !inQuotes) {
            inQuotes = true;
            quoteChar = char;
        } else if (char === quoteChar && inQuotes) {
            if (line[i + 1] === quoteChar) {
                current += quoteChar;
                i++;
            } else {
                inQuotes = false;
            }
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

const headers = parseCSVLine(csvLines[0]);
const skuIndex = headers.indexOf('Код');
const techCols = [];
for (let i = 0; i < headers.length; i++) {
    if (headers[i].toLowerCase().includes('technique')) {
        techCols.push(i);
    }
}

console.log('SKU column index:', skuIndex);
console.log('Technique columns:', techCols.length);

// Collect unique SKUs from CSV with techniques
const csvSkusWithTech = new Set();
const csvSkusWithoutTech = new Set();

for (let i = 1; i < csvLines.length; i++) {
    const line = csvLines[i];
    if (!line.trim()) continue;
    
    const cols = parseCSVLine(line);
    const sku = cols[skuIndex];
    if (!sku) continue;
    
    let hasTech = false;
    for (const techIdx of techCols) {
        const val = cols[techIdx];
        if (val && val.trim()) {
            hasTech = true;
            break;
        }
    }
    
    if (hasTech) {
        csvSkusWithTech.add(sku);
    } else {
        csvSkusWithoutTech.add(sku);
    }
}

console.log('\n=== CSV ANALYSIS ===');
console.log('Unique SKUs in CSV with techniques:', csvSkusWithTech.size);
console.log('Unique SKUs in CSV without techniques:', csvSkusWithoutTech.size);
console.log('Total unique SKUs in CSV:', csvSkusWithTech.size + csvSkusWithoutTech.size);

// Load products-imported.ts
const tsContent = fs.readFileSync('C:/Users/User/Desktop/OPEN CODE PROJECT/eu-printground/src/data/products-imported.ts', 'utf8');

// Find rawProducts boundaries
const startIdx = tsContent.indexOf('const rawProducts = [');
const exportPhrase = 'export { rawProducts as products }';
const exportIdx = tsContent.indexOf(exportPhrase);

let lastBracket = -1;
for (let i = exportIdx - 1; i > startIdx; i--) {
    if (tsContent[i] === ']') {
        lastBracket = i;
        break;
    }
}

const rawProductsStr = tsContent.substring(startIdx, lastBracket + 1);

// Extract SKUs from products-imported
const tsSkuRegex = /"sku":\s*"([^"]+)"/g;
const tsSkus = new Set();
let match;
while ((match = tsSkuRegex.exec(rawProductsStr)) !== null) {
    tsSkus.add(match[1]);
}

console.log('\n=== products-imported.ts ===');
console.log('Unique SKUs in products-imported:', tsSkus.size);

// Find SKUs in products-imported but NOT in CSV
const inTsNotCsv = [...tsSkus].filter(s => !csvSkusWithTech.has(s) && !csvSkusWithoutTech.has(s));
console.log('\nSKUs in products-imported but NOT in CSV at all:', inTsNotCsv.length);
if (inTsNotCsv.length > 0) {
    console.log('First 20:', inTsNotCsv.slice(0, 20));
}

// Find SKUs in CSV without techniques that ARE in products-imported
const csvNoTechInTs = [...csvSkusWithoutTech].filter(s => tsSkus.has(s));
console.log('\nSKUs in CSV WITHOUT techniques that ARE in products-imported:', csvNoTechInTs.length);
if (csvNoTechInTs.length > 0) {
    console.log('First 30:', csvNoTechInTs.slice(0, 30));
}

// Find SKUs in CSV WITH techniques that ARE in products-imported
const csvWithTechInTs = [...csvSkusWithTech].filter(s => tsSkus.has(s));
console.log('\nSKUs in CSV WITH techniques that ARE in products-imported:', csvWithTechInTs.length);
if (csvWithTechInTs.length > 0) {
    console.log('First 30:', csvWithTechInTs.slice(0, 30));
}

// Find SKUs in products-imported that are in CSV but WITHOUT techniques
const tsSkusInCsvWithoutTech = [...tsSkus].filter(s => csvSkusWithoutTech.has(s));
console.log('\n=== PRODUCTS-IMPORTED SKUs THAT ARE IN CSV BUT WITHOUT TECHNIQUES ===');
console.log('Count:', tsSkusInCsvWithoutTech.length);
console.log('First 50 SKUs:');
tsSkusInCsvWithoutTech.slice(0, 50).forEach(s => console.log(' ', s));
