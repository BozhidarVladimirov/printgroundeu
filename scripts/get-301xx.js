const fs = require('fs');
const content = fs.readFileSync('C:/Users/User/Desktop/OPEN CODE PROJECT/wc-product-export-30-3-2026-1774877107115.csv', 'utf8');
const lines = content.split('\n');

const skus = ['30102', '30106'];
skus.forEach(sku => {
    for (const line of lines) {
        if (line.includes(sku + '-')) {
            const cols = line.split(',');
            const name = cols.slice(4, 8).join(' ').replace(/"/g, '').trim();
            console.log(sku + ':', name.substring(0, 100));
            break;
        }
    }
});
