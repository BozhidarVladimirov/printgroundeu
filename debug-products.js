const fs = require('fs');

const csvPath = "C:\\Users\\User\\Desktop\\OPEN CODE PROJECT\\wc-product-export-30-3-2026-1774877107115.csv";

let content = fs.readFileSync(csvPath, 'utf8');
if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
}

const lines = content.split(/\r?\n/);

function parseCSVLine(line) {
    const values = [];
    let inQuotes = false;
    let current = '';
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current.trim());
    return values;
}

// Look for rows that might have the correct price
console.log("Searching for rows with higher prices...\n");

for (let i = 1; i < Math.min(lines.length, 200); i++) {
    const row = parseCSVLine(lines[i]);
    
    // Look for simple products (not variations) that might have prices
    if (row[1] === 'simple' || row[1] === 'product') {
        console.log(`Line ${i}: Type="${row[1]}", SKU="${row[2]}"`);
        
        // Search through all values for numeric prices
        for (let j = 0; j < row.length; j++) {
            const val = row[j];
            const num = parseFloat(val);
            if (val && !isNaN(num) && num > 5 && num < 100 && /^\d+([.,]\d+)?$/.test(val)) {
                console.log(`  [${j}]: "${val}"`);
            }
        }
        
        if (i > 10) break;
    }
}

// Also look for the specific product 11031
console.log("\n\nSearching for product 11031...");
for (let i = 1; i < Math.min(lines.length, 500); i++) {
    const row = parseCSVLine(lines[i]);
    const sku = row[2] || '';
    
    if (sku.includes('11031')) {
        console.log(`\nLine ${i}: Type="${row[1]}", SKU="${sku}"`);
        
        // Show first 40 columns
        for (let j = 0; j < Math.min(40, row.length); j++) {
            if (row[j]) {
                console.log(`  [${j}]: "${row[j]}"`);
            }
        }
    }
}
