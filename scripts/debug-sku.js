const fs = require('fs');

const c = fs.readFileSync('./src/data/products-imported.ts', 'utf8');
const pattern = /"sku": "11031"/g;
const matches = c.match(pattern);
console.log('Occurrences of SKU 11031:', matches ? matches.length : 0);

// Check what's around each occurrence
let index = 0;
let count = 0;
while ((index = c.indexOf('"sku": "11031"', index)) !== -1) {
    count++;
    console.log(`\nOccurrence ${count} at index ${index}:`);
    console.log(c.substring(index, index + 200));
    index += 1;
}
