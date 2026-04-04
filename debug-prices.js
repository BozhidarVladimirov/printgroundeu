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

const header = parseCSVLine(lines[0]);
const data = parseCSVLine(lines[1]);

console.log("Looking at more data columns for prices...\n");

// Look for numeric values that could be prices (between 1 and 100)
for (let i = 0; i < 50; i++) {
    const val = data[i];
    const num = parseFloat(val);
    if (val && !isNaN(num) && num > 0.5 && num < 200 && /^\d+([.,]\d+)?$/.test(val)) {
        console.log(`[${i}] Header: "${header[i]}" Value: "${val}"`);
    }
}

// Check for parent product row
console.log("\nLooking for parent product (same SKU without color code)...");
const sku = data[2]; // "11031-106"
const baseSku = sku.split('-').slice(0, -1).join('-'); // "11031"

for (let i = 1; i < Math.min(lines.length, 100); i++) {
    const row = parseCSVLine(lines[i]);
    if (row[2] === baseSku || row[2] === baseSku + '-L' || row[2] === baseSku + '-M') {
        console.log(`\nFound potential parent at line ${i}:`);
        console.log(`  SKU: "${row[2]}"`);
        for (let j = 0; j < 35; j++) {
            if (row[j] && header[j]) {
                console.log(`  [${j}] ${header[j]}: "${row[j]}"`);
            }
        }
        break;
    }
}
