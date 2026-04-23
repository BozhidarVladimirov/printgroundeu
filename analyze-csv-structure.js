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
const typeIndex = headers.indexOf('Вид');
const techCols = [];
for (let i = 0; i < headers.length; i++) {
    if (headers[i].toLowerCase().includes('technique')) {
        techCols.push(i);
    }
}

console.log('=== ANALYZING CSV STRUCTURE ===');
console.log('Total lines:', csvLines.length);
console.log('SKU index:', skuIndex, ', Type index:', typeIndex);
console.log('Technique columns:', techCols.length);

// Analyze first 6000 rows in detail
let withTech = 0;
let withoutTech = 0;
const typesSeen = new Set();

for (let i = 1; i < 6000 && i < csvLines.length; i++) {
    const line = csvLines[i];
    if (!line.trim()) continue;
    
    const cols = parseCSVLine(line);
    const type = cols[typeIndex];
    typesSeen.add(type || '(empty)');
    
    let hasTech = false;
    for (const techIdx of techCols) {
        const val = cols[techIdx];
        if (val && val.trim()) {
            hasTech = true;
            break;
        }
    }
    
    if (hasTech) withTech++;
    else withoutTech++;
}

console.log('\n=== FIRST 6000 ROWS ===');
console.log('With techniques:', withTech);
console.log('Without techniques:', withoutTech);
console.log('Types seen:', [...typesSeen]);

// Now let's understand the pattern - look at which rows have techniques
// Find the exact boundary where techniques stop
let lastWithTechRow = -1;
let firstWithoutTechRow = -1;

for (let i = 1; i < csvLines.length; i++) {
    const line = csvLines[i];
    if (!line.trim()) continue;
    
    const cols = parseCSVLine(line);
    let hasTech = false;
    for (const techIdx of techCols) {
        const val = cols[techIdx];
        if (val && val.trim()) {
            hasTech = true;
            break;
        }
    }
    
    if (hasTech && lastWithTechRow === -1) {
        lastWithTechRow = i;
    }
    if (!hasTech && firstWithoutTechRow === -1 && i > 5721) {
        firstWithoutTechRow = i;
        break;
    }
}

console.log('\n=== TECHNIQUE BOUNDARY ===');
console.log('Last row with techniques (around):', lastWithTechRow);
console.log('First row without techniques (around):', firstWithoutTechRow);

// Look at the actual SKUs that are around the boundary
console.log('\n=== SKUs AROUND BOUNDARY (rows 5715-5730) ===');
for (let i = 5715; i < 5735 && i < csvLines.length; i++) {
    const line = csvLines[i];
    if (!line.trim()) continue;
    
    const cols = parseCSVLine(line);
    const sku = cols[skuIndex] || '(empty)';
    const type = cols[typeIndex] || '(empty)';
    
    let hasTech = false;
    let techVal = '';
    for (const techIdx of techCols) {
        const val = cols[techIdx];
        if (val && val.trim()) {
            hasTech = true;
            techVal = val.substring(0, 30);
            break;
        }
    }
    
    console.log(`Row ${i}: SKU="${sku}", Type="${type}", HasTech=${hasTech}, Tech="${techVal}"`);
}

// Check - maybe the issue is that products-imported.ts SKUs (without hyphen) 
// are prefixes of CSV SKUs (with hyphen)
console.log('\n=== CHECKING SKU PREFIX MATCHING ===');
// Extract parent SKU from CSV variations (remove suffix after hyphen)
const parentSkuCounts = {};
for (let i = 1; i < csvLines.length; i++) {
    const line = csvLines[i];
    if (!line.trim()) continue;
    
    const cols = parseCSVLine(line);
    const sku = cols[skuIndex];
    if (!sku) continue;
    
    // Extract parent SKU (before hyphen)
    const parentSku = sku.split('-')[0];
    if (!parentSkuCounts[parentSku]) {
        parentSkuCounts[parentSku] = { total: 0, withTech: 0, withoutTech: 0 };
    }
    
    let hasTech = false;
    for (const techIdx of techCols) {
        const val = cols[techIdx];
        if (val && val.trim()) {
            hasTech = true;
            break;
        }
    }
    
    parentSkuCounts[parentSku].total++;
    if (hasTech) {
        parentSkuCounts[parentSku].withTech++;
    } else {
        parentSkuCounts[parentSku].withoutTech++;
    }
}

// Show parent SKUs with variations
const parentSkusList = Object.entries(parentSkuCounts)
    .filter(([_, data]) => data.total > 1)
    .slice(0, 20);

console.log('Parent SKUs with most variations:');
parentSkusList.forEach(([sku, data]) => {
    console.log(`  ${sku}: total=${data.total}, withTech=${data.withTech}, withoutTech=${data.withoutTech}`);
});

// Check if there's a pattern where parent products have some variations with techniques and some without
console.log('\n=== PATTERN ANALYSIS ===');
let fullyWithTech = 0;
let fullyWithoutTech = 0;
let mixedTech = 0;

for (const [sku, data] of Object.entries(parentSkuCounts)) {
    if (data.total > 0) {
        if (data.withTech > 0 && data.withoutTech === 0) {
            fullyWithTech++;
        } else if (data.withTech === 0 && data.withoutTech > 0) {
            fullyWithoutTech++;
        } else {
            mixedTech++;
        }
    }
}

console.log('Parent SKUs where ALL variations have techniques:', fullyWithTech);
console.log('Parent SKUs where NO variations have techniques:', fullyWithoutTech);
console.log('Parent SKUs where SOME variations have techniques:', mixedTech);
