const fs = require('fs');
const content = fs.readFileSync('C:/Users/User/Desktop/OPEN CODE PROJECT/wc-product-export-30-3-2026-1774877107115.csv', 'utf8');
const lines = content.split('\n');

const skus = ['92083', '11078', '11031', '36004', '11061', '13212', '11032', '11034'];
const results = {};

skus.forEach(sku => {
    for (const line of lines) {
        const cols = line.split(',');
        const col2 = cols[2] || '';
        if (col2.startsWith(sku + '-')) {
            const name = cols[4] || '';
            const desc = cols[5] || '';
            if (name && !results[sku]) {
                const cleanName = name.replace(/"/g, '').trim();
                const cleanDesc = desc.replace(/"/g, '').trim();
                results[sku] = { name: cleanName, description: cleanDesc };
                break;
            }
        }
    }
});

console.log(JSON.stringify(results, null, 2));
