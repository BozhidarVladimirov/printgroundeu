const fs = require('fs');

const csvPath = "C:\\Users\\User\\Desktop\\OPEN CODE PROJECT\\wc-product-export-30-3-2026-1774877107115.csv";

let content = fs.readFileSync(csvPath, 'utf8');
if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
}

const lines = content.split(/\r?\n/);

// Better CSV parser
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

console.log("Searching for correct column positions...\n");

// Search for specific columns
const searches = ['вид', 'Вид', 'type', 'Код', 'SKU', 'Име', 'name', 'цена', 'Цена', 'image', 'mage', 'зображ', 'Categories', 'категории'];

for (const search of searches) {
    const found = header.map((h, i) => ({ index: i, value: h })).filter(h => h.value.includes(search));
    if (found.length > 0) {
        console.log(`"${search}" found at:`, found.map(f => `[${f.index}] "${f.value}"`));
    }
}

// Check the first few data values
console.log("\nFirst data line values (first 35):");
const data = parseCSVLine(lines[1]);
for (let i = 0; i < Math.min(35, data.length); i++) {
    console.log(`[${i}]: "${data[i]}"`);
}

// Try to find the actual type column (should contain 'variation' or 'variable')
console.log("\nLooking for type column containing 'variation'...");
for (let i = 0; i < data.length; i++) {
    if (data[i] === 'variation' || data[i] === 'variable') {
        console.log(`Found type='variation' at index ${i}. Header: "${header[i]}"`);
    }
}
