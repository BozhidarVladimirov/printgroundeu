const fs = require('fs');

const csvPath = 'C:/Users/User/Desktop/OPEN CODE PROJECT/wc-product-export-30-3-2026-1774877107115.csv';
const content = fs.readFileSync(csvPath, 'utf8');
const lines = content.split('\n');

// Find product 92083-134 variation
lines.forEach((line, idx) => {
    if (idx === 0 || !line.trim()) return;
    
    const cols = line.split(',');
    const sku = cols[2] || '';
    
    if (sku === '92083-134') {
        console.log(`Line ${idx}:`);
        console.log('SKU:', sku);
        console.log('Name cols 4-6:', cols[4], cols[5], cols[6]);
        
        // Show hex codes of each character to identify Bulgarian letters
        const name = (cols[4] || '') + ' ' + (cols[5] || '');
        console.log('\nHex of name:');
        for (let i = 0; i < Math.min(name.length, 100); i++) {
            process.stdout.write(name.charCodeAt(i).toString(16).padStart(4, '0') + ' ');
        }
        console.log('\n\n');
    }
});
