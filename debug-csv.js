const fs = require('fs');
let content = fs.readFileSync('C:/Users/User/Desktop/OPEN CODE PROJECT/wc-product-export-30-3-2026-1774877107115.csv', 'utf8');
if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
const lines = content.split(/\r?\n/);
const header = lines[0].split(',');
const data = lines[1].split(',');
console.log('Header length:', header.length);
console.log('Data length:', data.length);
for(let i=0; i<35; i++) {
    console.log('['+i+'] H="'+header[i]+'" D="'+data[i]+'"');
}
