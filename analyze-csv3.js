const fs = require('fs');
const path = 'C:/Users/User/Desktop/OPEN CODE PROJECT/wc-product-export-30-3-2026-1774877107115.csv';

// Read file
let content = fs.readFileSync(path, 'utf8');
if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
}

const lines = content.split('\n');
const headers = parseCSVLine(lines[0]);

const techniqueColumns = [];
for (let i = 0; i < headers.length; i++) {
    const h = headers[i].toLowerCase();
    if (h.includes('technique')) {
        techniqueColumns.push({ index: i, name: headers[i] });
    }
}

const typeIndex = headers.indexOf('Вид');
const skuIndex = headers.indexOf('Код');
const nameIndex = headers.indexOf('Име');

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

// Find where rows without techniques start
console.log('Searching for rows without techniques...\n');

let firstWithoutTechLine = -1;
let firstWithoutTechSku = '';
let firstWithoutTechType = '';

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const cols = parseCSVLine(line);
    let hasTech = false;
    for (const techCol of techniqueColumns) {
        const val = cols[techCol.index];
        if (val && val.trim()) {
            hasTech = true;
            break;
        }
    }
    
    if (!hasTech) {
        if (firstWithoutTechLine === -1) {
            firstWithoutTechLine = i;
            firstWithoutTechSku = cols[skuIndex] || '';
            firstWithoutTechType = cols[typeIndex] || '';
            console.log(`First row WITHOUT techniques found at line ${i}`);
            console.log(`SKU: "${firstWithoutTechSku}", Type: "${firstWithoutTechType}"`);
            console.log(`Full line preview: ${line.substring(0, 200)}...`);
            console.log('\n');
        }
        break;
    }
}

// Now let's look at a section of the file around line 10000
console.log('\n=== LINES AROUND 10000 ===');
for (let i = 9995; i < 10010; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const cols = parseCSVLine(line);
    const sku = cols[skuIndex] || '';
    const type = cols[typeIndex] || '';
    
    let hasTech = false;
    let techValue = '';
    for (const techCol of techniqueColumns) {
        const val = cols[techCol.index];
        if (val && val.trim()) {
            hasTech = true;
            techValue = val;
            break;
        }
    }
    
    console.log(`Line ${i}: SKU="${sku}", Type="${type}", HasTech=${hasTech}, Tech="${techValue}"`);
}

// Check the last few lines of the file
console.log('\n=== LAST 10 LINES ===');
for (let i = lines.length - 10; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const cols = parseCSVLine(line);
    const sku = cols[skuIndex] || '';
    const type = cols[typeIndex] || '';
    
    let hasTech = false;
    for (const techCol of techniqueColumns) {
        const val = cols[techCol.index];
        if (val && val.trim()) {
            hasTech = true;
            break;
        }
    }
    
    console.log(`Line ${i}: SKU="${sku}", Type="${type}", HasTech=${hasTech}`);
}

// Count unique SKUs with and without techniques
console.log('\n=== COUNTING UNIQUE SKUs ===');
const skusWithTech = new Set();
const skusWithoutTech = new Set();

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const cols = parseCSVLine(line);
    const sku = cols[skuIndex];
    
    if (!sku) continue;
    
    let hasTech = false;
    for (const techCol of techniqueColumns) {
        const val = cols[techCol.index];
        if (val && val.trim()) {
            hasTech = true;
            break;
        }
    }
    
    if (hasTech) {
        skusWithTech.add(sku);
    } else {
        skusWithoutTech.add(sku);
    }
}

console.log('Unique SKUs with techniques:', skusWithTech.size);
console.log('Unique SKUs without techniques:', skusWithoutTech.size);
console.log('Total unique SKUs:', skusWithTech.size + skusWithoutTech.size);

console.log('\n=== SAMPLE SKUs WITHOUT TECHNIQUES ===');
let count = 0;
for (const sku of skusWithoutTech) {
    if (count < 30) {
        console.log(`SKU: ${sku}`);
        count++;
    }
}

// Check for "simple" or "variable" product types
console.log('\n=== CHECKING FOR NON-VARIATION PRODUCTS ===');
const types = {};
for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const cols = parseCSVLine(line);
    const type = cols[typeIndex] || '';
    
    if (!types[type]) types[type] = 0;
    types[type]++;
}

console.log('Type distribution:');
for (const [type, count] of Object.entries(types)) {
    console.log(`  "${type}": ${count}`);
}
