const fs = require('fs');
const path = 'C:/Users/User/Desktop/OPEN CODE PROJECT/wc-product-export-30-3-2026-1774877107115.csv';

// Read file and remove BOM
let content = fs.readFileSync(path, 'utf8');
if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
}

// Split into lines
const lines = content.split('\n');
console.log('Total lines in file:', lines.length);
console.log('First line (header) starts with:', lines[0].substring(0, 100));

// Parse header to get column indices
const headerLine = lines[0];
const headers = parseCSVLine(headerLine);
console.log('\nHeader columns:', headers.length);

// Find technique columns
const techniqueColumns = [];
for (let i = 0; i < headers.length; i++) {
    const h = headers[i].toLowerCase();
    if (h.includes('technique')) {
        techniqueColumns.push({ index: i, name: headers[i] });
    }
}
console.log('Technique columns found:', techniqueColumns.length);
console.log('First technique column:', techniqueColumns[0]);

// Find the key column indices
const typeIndex = headers.indexOf('Вид');
const skuIndex = headers.indexOf('Код');
const nameIndex = headers.indexOf('Име');

console.log('\nKey columns - Type:', typeIndex, 'SKU:', skuIndex, 'Name:', nameIndex);

// Parse CSV line properly
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
            // Check for escaped quote
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

// Analyze first 2000 data rows
const dataLines = lines.slice(1, 2001);
console.log('\nAnalyzing', dataLines.length, 'rows...');

let withTech = 0;
let withoutTech = 0;
const variations = new Set();
const simpleProducts = new Set();
const variableProducts = new Set();
const skusWithoutTech = [];

for (let i = 0; i < dataLines.length; i++) {
    const line = dataLines[i];
    if (!line.trim()) continue;
    
    const cols = parseCSVLine(line);
    const type = cols[typeIndex] || '';
    const sku = cols[skuIndex] || '';
    
    // Track product types
    if (type === 'variation') variations.add(sku);
    else if (type === 'simple') simpleProducts.add(sku);
    else if (type === 'variable') variableProducts.add(sku);
    
    // Check for technique data
    let hasTech = false;
    for (const techCol of techniqueColumns) {
        const val = cols[techCol.index];
        if (val && val.trim()) {
            hasTech = true;
            break;
        }
    }
    
    if (hasTech) {
        withTech++;
    } else {
        withoutTech++;
        if (skusWithoutTech.length < 30) {
            skusWithoutTech.push({ sku, type, name: (cols[nameIndex] || '').substring(0, 50) });
        }
    }
}

console.log('\n=== ANALYSIS OF FIRST 2000 ROWS ===');
console.log('Variations (unique SKUs):', variations.size);
console.log('Simple products (unique SKUs):', simpleProducts.size);
console.log('Variable products (unique SKUs):', variableProducts.size);
console.log('With techniques:', withTech);
console.log('Without techniques:', withoutTech);

console.log('\n=== SAMPLE SKUs WITHOUT TECHNIQUES (first 2000 rows) ===');
skusWithoutTech.forEach(p => console.log(`SKU: ${p.sku} | Type: ${p.type} | Name: ${p.name}`));

// Now let's analyze the full file - just count variations and check technique distribution
console.log('\n\n=== ANALYZING FULL FILE ===');

// Count all rows properly
let totalRows = 0;
let totalWithTech = 0;
let totalWithoutTech = 0;
const sampleWithoutTech = [];

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    totalRows++;
    
    const cols = parseCSVLine(line);
    
    // Check for technique data
    let hasTech = false;
    for (const techCol of techniqueColumns) {
        const val = cols[techCol.index];
        if (val && val.trim()) {
            hasTech = true;
            break;
        }
    }
    
    if (hasTech) {
        totalWithTech++;
    } else {
        totalWithoutTech++;
        if (sampleWithoutTech.length < 20) {
            const sku = cols[skuIndex] || '';
            const type = cols[typeIndex] || '';
            sampleWithoutTech.push({ sku, type });
        }
    }
    
    // Progress indicator
    if (i % 100000 === 0) {
        console.log(`Processed ${i} lines...`);
    }
}

console.log('\n=== FULL FILE ANALYSIS ===');
console.log('Total data rows:', totalRows);
console.log('With techniques:', totalWithTech);
console.log('Without techniques:', totalWithoutTech);
console.log('Percentage without techniques:', ((totalWithoutTech / totalRows) * 100).toFixed(2) + '%');

console.log('\n=== SAMPLE SKUs WITHOUT TECHNIQUES (full file) ===');
sampleWithoutTech.forEach(p => console.log(`SKU: ${p.sku} | Type: ${p.type}`));
