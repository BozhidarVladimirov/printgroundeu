const fs = require('fs');

const csvPath = 'C:/Users/User/Desktop/OPEN CODE PROJECT/wc-product-export-30-3-2026-1774877107115.csv';
const content = fs.readFileSync(csvPath, 'utf8');
const lines = content.split('\n');

// Find header
const header = lines[0].split(',');
console.log('Looking for columns...');

// Search for product 92083
const searchTerms = ['92083', 'istanbul', 'ISTANBUL'];

lines.forEach((line, idx) => {
    if (idx === 0 || !line.trim()) return;
    
    const cols = line.split(',');
    const sku = cols[2] || '';
    const name = cols[4] || '';
    
    // Check if this line contains our search terms
    const lowerLine = (sku + name).toLowerCase();
    if (searchTerms.some(term => lowerLine.includes(term.toLowerCase()))) {
        console.log(`\n=== Line ${idx} ===`);
        console.log('SKU:', sku);
        console.log('Name:', name);
        console.log('Images column (33):', cols[33] || 'N/A');
        
        // Show first 40 columns
        console.log('\nFirst 40 columns:');
        for (let i = 0; i < 40; i++) {
            if (cols[i] && cols[i].trim()) {
                console.log(`  [${i}]: ${cols[i].substring(0, 100)}`);
            }
        }
    }
});
